import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Template-Driven Forms için

// Oluşturduğumuz UI bileşenlerini import ediyoruz
import { UInputComponent } from '../../components/u-input/u-input.component';
import { UButtonComponent } from '../../components/u-button/u-button.component';
import { Router, RouterModule } from '@angular/router';
import { ValidateDirective } from '../../components/u-input/validate.directive';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDto } from '../../models/userDto';
import { RequestMessage } from '../../core/messages/requestMessage';
import { HttpService } from '../../services/httpservice';
import {ResponseMessage } from '../../core/messages/responseMessage';
import { UCheckboxComponent } from '../../components/u-checkbox/u-checkbox.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  // Gerekli modülleri ve UI bileşenlerini imports dizisine ekliyoruz
  imports: [
    ValidateDirective,
    CommonModule,
    FormsModule, // ngModel, ngForm vb. için
    UInputComponent,
    UButtonComponent,
    UCheckboxComponent,
    RouterModule,    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})




export class LoginComponent {
  @Input() disabled: boolean = false; // Butonun pasif durumu
  @Output() clickEvent = new EventEmitter<MouseEvent>();

  data: any;

  constructor(private router:Router, private authService:AuthService,private svcHttp: HttpService, private loginService:LoginService) { 
    // AuthService'i constructor'da inject ediyoruz
   }
   SignIn(event:any) {
    console.log(event.target.validity.valid);
    this.router.navigateByUrl('/');
  }

  user: UserDto = new UserDto();

  loginData =  {
    UserEmail: '',
    UserPassword: '',
  };


  ngOnInit(): void {
    this.loginService.loginData=this.loginData ;
  }


  loginData2 = {
    userEmail: '',
    userPassword: '',
  };
  submitted = false; // Formun gönderilip gönderilmediğini takip etmek için (opsiyonel)
usernameInput: any;



  login(){

    let dto = new UserDto();

    dto.UserEmail = this.loginData2.userEmail;
    dto.UserPassword=this.loginData2.userPassword;

        let requestMessage = new RequestMessage();
        requestMessage.Add("Goals.Common.Dtos.UserDto", dto);

            this.svcHttp.post('User/token',requestMessage).subscribe((res : ResponseMessage) => {
              let Data = res.Get<UserDto>("Goals.Common.Dtos.UserDto");
              const data = res.Get<UserDto>("Goals.Common.Dtos.UserDto");
              console.log('DATA:', data);
              console.log('ItemsProxy:', res.ItemsProxy);
              this.user = res.Get<UserDto>("Goals.Common.Dtos.UserDto");
              this.router.navigate(['/dashboard']);
              localStorage.setItem('token', res.ItemsProxy.token);
              this.data=Data;
              return this.user;
            });

    this.svcHttp.getToken({UserEmail:this.loginData.UserEmail, UserPassword:this.loginData.UserPassword}).subscribe((res) => {
      console.log('Token:', res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard']);
    });
  }


    getUser(){
      let dto = new UserDto();
      
      dto.UserEmail = this.loginData2.userEmail;
      dto.UserPassword=this.loginData2.userPassword;
  
      let requestMessage = new RequestMessage();
      requestMessage.Add("Goals.Common.Dtos.UserDto", dto);
  
      this.svcHttp.post('User/token',requestMessage).subscribe((res : ResponseMessage) => {
        const Data = res.Get<UserDto>("Goals.Common.Dtos.UserDto");
        this.data=Data;
        if(this.data){
          this.router.navigate(['/dashboard']);
        }
        return this.data;
        
        debugger;
      });
    }
    
}

