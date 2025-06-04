import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDto } from '../models/userDto';
import { RequestMessage } from '../core/messages/requestMessage';
import { ResponseMessage } from '../core/messages/responseMessage';
import { HttpService } from './httpservice';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router : Router , private http:HttpClient,private svcHttp: HttpService) { }

  data: any;
  user: UserDto = new UserDto();

  public loginData = {
    UserEmail: '',
    UserPassword: '',
  };

  login = () =>{

    let requestMessage = new RequestMessage();

    let dto = new UserDto();
  
    dto.UserEmail = this.loginData.UserEmail;
    dto.UserPassword=this.loginData.UserPassword;

    requestMessage.Add("Goals.Common.Dtos.UserDto", dto);


    this.svcHttp.getToken({UserEmail:this.loginData.UserEmail, UserPassword:this.loginData.UserPassword}).subscribe((res) => {
      localStorage.setItem('token', res.token.AccessToken);
      localStorage.setItem('refreshToken', res.token.RefreshToken);
      localStorage.setItem('expiredate', res.token.ExpireDate);
      localStorage.setItem('userId', res.token.UserId);
      this.router.navigate(['/home']);
    });

}  

}