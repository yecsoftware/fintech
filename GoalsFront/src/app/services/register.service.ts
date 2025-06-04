import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDto } from '../models/userDto';
import { HttpService } from '../services/httpservice';
import { RequestMessage } from '../core/messages/requestMessage';
import { ResponseMessage } from '../core/messages/responseMessage';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private snackBar: MatSnackBar,private router : Router , private http:HttpClient,private svcHttp: HttpService) { }



registerData = {
  UserName: '',
  UserEmail: '',
  UserPassword: '',
  ConfirmPassword: '',
  Terms: false // <-- bu satırı eklemelisin
};


    register = () =>{
  
      let requestMessage = new RequestMessage();
  
      let dto = new UserDto();
    
      dto.UserEmail = this.registerData.UserEmail;
      dto.UserPassword=this.registerData.UserPassword;
      dto.UserName=this.registerData.UserName;

  
      requestMessage.Add("Goals.Common.Dtos.UserDto", dto);
  
  
      this.svcHttp.post('User/RegisterUser' , requestMessage).subscribe((res:ResponseMessage) => {
        this.snackBar.open('✅ Kullanıcı başarıyla oluşturuldu.', '', {
          duration: 2000,
          panelClass: ['mat-success-snackbar']
        });
        setTimeout(() => {
          this.snackBar.open('🔁 Giriş sayfasına yönlendiriliyorsunuz...', '', {
            duration: 2000,
            panelClass: ['mat-info-snackbar']
          });
      
          // İkinci mesajdan sonra yönlendirme
          setTimeout(() => {
            this.router.navigate(['/login']);
          } ,2000);
        }, 1500);
        
        // setTimeout(() => {
        //   this.router.navigate(['/login']);
        // }, 2000);
      });
    
  
  }  
}
