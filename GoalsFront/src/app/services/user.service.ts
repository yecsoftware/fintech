import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDto } from '../models/userDto';
import { RequestMessage } from '../core/messages/requestMessage';
import { HttpService } from './httpservice';
import { ResponseMessage } from '../core/messages/responseMessage';



@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private router : Router , private http:HttpClient,private svcHttp: HttpService) { }

  public userData = {
    UserPhoneNumber:'',
  };
  
  
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