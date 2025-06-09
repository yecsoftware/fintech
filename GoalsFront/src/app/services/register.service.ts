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
  Base64Image: '',
  UserPhoneNumber: '',
  Terms: false // <-- bu satırı eklemelisin
};


// register = () => {
//   let requestMessage = new RequestMessage();

//   let dto = new UserDto();
//   dto.UserEmail = this.registerData.UserEmail;
//   dto.UserPassword = this.registerData.UserPassword;
//   dto.UserName = this.registerData.UserName;

//   requestMessage.Add("Goals.Common.Dtos.UserDto", dto);

//   // Base64 varsa ekle
//   if (this.registerData.Base64Image) {
//     requestMessage.Add("Base64File", this.registerData.Base64Image);
//   }

//   this.svcHttp.post('User/RegisterUser', requestMessage).subscribe((res: ResponseMessage) => {
//     this.snackBar.open('✅ Kullanıcı başarıyla oluşturuldu.', '', {
//       duration: 2000,
//       panelClass: ['mat-success-snackbar']
//     });

//     setTimeout(() => {
//       this.snackBar.open('🔁 Giriş sayfasına yönlendiriliyorsunuz...', '', {
//         duration: 2000,
//         panelClass: ['mat-info-snackbar']
//       });

//       setTimeout(() => {
//         this.router.navigate(['/login']);
//       }, 2000);
//     }, 1500);
//   });
// };


register = (formData: any) => {
  const requestMessage = new RequestMessage();

  const dto = new UserDto();
  dto.UserEmail = formData.UserEmail;
  dto.UserPassword = formData.UserPassword;
  dto.UserName = formData.UserName;
  dto.UserPhoneNumber = formData.UserPhoneNumber || ''; // Telefon numarası opsiyonel
  dto.UserPhotoPath = formData.Base64Image || ''; // Fotoğraf yolu opsiyonel

  requestMessage.Add("Goals.Common.Dtos.UserDto", dto);

  if (formData.Base64Image) {
    requestMessage.Add("Base64File", formData.Base64Image);
  }

  this.svcHttp.post('User/RegisterUser', requestMessage).subscribe((res: ResponseMessage) => {
    this.snackBar.open('✅ Kullanıcı başarıyla oluşturuldu.', '', {
      duration: 2000,
      panelClass: ['mat-success-snackbar']
    });

    setTimeout(() => {
      this.snackBar.open('🔁 Giriş sayfasına yönlendiriliyorsunuz...', '', {
        duration: 2000,
        panelClass: ['mat-info-snackbar']
      });

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, 1500);
  });
};
}
