import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { LogoutService } from '../../services/logout.service';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import { UserService } from '../../services/user.service';
import { HttpService } from '../../services/httpservice';

@Component({
  selector: 'u-button',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './u-button.component.html',
  styleUrls: ['./u-button.component.scss']
})
export class UButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon?: string;
  @Input({required:true}) label: string = '';
  @Input() actionType?: string; 
  @Input() backgroundColor?: string;
  @Input() textColor?: string;
  @Input() registerData: any;
  @Input() theme: 'dark' | 'light' | 'default' = 'light';
  @Output() clicked = new EventEmitter<MouseEvent>();
  
  @Output() clickEvent = new EventEmitter<void>();

  constructor(private logoutService: LogoutService,private loginService:LoginService,private registerService:RegisterService,private userService:UserService,private httpService:HttpService) {}
  

  onClick(event: MouseEvent):void {
    if (this.actionType === 'get') {
      this.userService.getUserWithPhoneNumber();
    }
    else if (this.actionType === 'logout') {
      this.logoutService.logout(); // <-- doğru servisi çağırıyoruz
    }else if (this.actionType === 'register') {
      this.registerService.register(this.registerData);
    }
    else if (this.actionType === 'login') {
      this.loginService.login();}
    else {
      this.clicked.emit(event);
    }
  }
}