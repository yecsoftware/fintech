import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UButtonComponent } from '../../components/u-button/u-button.component';
import { LogoutService } from '../../services/logout.service';
import { HttpClient } from '@angular/common/http';
import { OnInit, inject } from '@angular/core';
import { UserDto } from '../../models/userDto';
import { HttpService } from '../../services/httpservice';
import { RequestMessage } from '../../core/messages/requestMessage';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionDialogComponent } from '../../components/session-dialog/session-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layouts',
  imports: [RouterOutlet, RouterLink, UButtonComponent, NgIf, CommonModule, RouterModule],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent implements OnInit {
  sidebarOpen = false;
  user: UserDto | null = null;
  data: any;
  userName: string = '';
  private sessionTimer: any = null;

  http = inject(HttpClient);

  constructor(
    private userService: UserService,
    public logoutService: LogoutService,
    private svcHttp: HttpService,
    private router: Router,
    private loginService: LoginService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit() {
    this.checkAndRefreshToken().then(() => {
      this.loadUser();
      this.scheduleSessionWarning();
    });
  }

  logoutFn = () => {
    this.logoutService.logout();
  };

  scheduleSessionWarning() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }

    const expireStr = localStorage.getItem('expiredate');
    if (!expireStr) return;

    const expireTime = new Date(expireStr).getTime();
    const now = Date.now();
    const warningBeforeMs = 30 * 1000;
    const triggerIn = expireTime - now - warningBeforeMs;

    console.log('Yeni expireDate:', expireStr);
    console.log('Trigger in ms:', triggerIn);

    if (triggerIn > 0) {
      this.sessionTimer = setTimeout(() => {
        this.askUserToExtendSession();
      }, triggerIn);
    } else {
      this.askUserToExtendSession();
    }
  }

  askUserToExtendSession() {
    const dialogRef = this.dialog.open(SessionDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.refreshToken();
      } else {
        alert('Oturum süreniz doldu.');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');

    this.http.post<any>('http://localhost:5026/User/RefreshToken', {
      userId,
      refreshToken
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.AccessToken);
        localStorage.setItem('refreshToken', res.RefreshToken);
        localStorage.setItem('expiredate', res.ExpireDate);
        console.log('Yeni expireDate:', res.expireDate);
        this.scheduleSessionWarning();
      },
      error: () => {
        alert('Refresh işlemi başarısız oldu.');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  checkAndRefreshToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const userId = localStorage.getItem('userId');
      const expireStr = localStorage.getItem('expiredate');
      const now = Date.now();

      if (!token || !refreshToken || !userId || !expireStr) {
        this.router.navigate(['/login']);
        return reject();
      }

      const expireTime = new Date(expireStr).getTime();
      if (expireTime <= now) {
        this.http.post<any>('http://localhost:5026/User/RefreshToken', {
          userId,
          refreshToken
        }).subscribe({
          next: (res) => {
            localStorage.setItem('token', res.AccessToken);
            localStorage.setItem('refreshToken', res.RefreshToken);
            localStorage.setItem('expiredate', res.ExpireDate);
            resolve();
          },
          error: () => {
            localStorage.clear();
            alert('Oturum süreniz doldu.');
            this.router.navigate(['/login']);
            reject();
          }
        });
      } else {
        resolve(); // token hâlâ geçerli
      }
    });
  }

  loadUser() {
    const requestMessage = new RequestMessage();
    requestMessage.Add('Goals.Common.Dtos.UserDto', new UserDto());

    this.svcHttp.post('User/decodeUser', requestMessage).subscribe((res) => {
      const user = res.Get<UserDto>('Goals.Common.Dtos.UserDto');

      if (user) {
        this.user = user;
        this.userService.setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.cd.detectChanges(); // DOM'u güncelle
      }
    });
  }
}
  