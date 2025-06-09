import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDto } from '../models/userDto';
import { RequestMessage } from '../core/messages/requestMessage';
import { HttpService } from './httpservice';
import { BehaviorSubject } from 'rxjs';
import { ResponseMessage } from '../core/messages/responseMessage';



@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  public user$ = this.userSubject.asObservable();
  constructor(private router : Router , private http:HttpClient,private svcHttp: HttpService) { }

  public userData = {
    UserPhoneNumber:'',
  };

  setUser(user: UserDto) {
    this.userSubject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user)); // persist opsiyonel
  }

  getUser(): UserDto | null {
    return this.userSubject.value;
  }

  loadUserFromSession() {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson) as UserDto;
      this.userSubject.next(user);
    }
  }

  clearUser() {
    this.userSubject.next(null);
    sessionStorage.removeItem('user');
  }
  
  
  getUserWithPhoneNumber() {
    let requestMessage = new RequestMessage();
    let dto = new UserDto();

    dto.UserPhoneNumber = this.userData.UserPhoneNumber;

    requestMessage.Add("Goals.Common.Dtos.UserDto", dto);


      this.svcHttp.post('User/GetUserWithPhoneNumber',requestMessage).subscribe((res) => {
      const user = res.Get<UserDto>("Goals.Common.Dtos.UserDto");
      dto.UserName = user.UserName;
      dto.UserID = user.UserID;
      console.log(user);
    });
    

  }
}