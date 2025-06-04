import { Component } from '@angular/core';
import { COMMON_COMPONENTS } from '../../shared/common-components';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [COMMON_COMPONENTS,FormsModule,RouterOutlet,RouterLink,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router : Router,private registerService:RegisterService) {}





  registerData = {
  UserName: '',
  UserEmail: '',
  UserPassword: '',
  ConfirmPassword: '',
  Terms: false
};
  ngOnInit(): void {
    this.registerData = this.registerService.registerData;
  }

register() {
  if (this.registerData.UserPassword !== this.registerData.ConfirmPassword) {
    alert('Şifreler uyuşmuyor.');
    return;
  }

  if (!this.registerData.Terms) {
    alert('Lütfen şartları kabul edin.');
    return;
  }

  // ✔ Her şey uygunsa form gönderilebilir
  console.log('Kayıt işlemi başlatılıyor:', this.registerData);

  // Burada API çağrısı yapılabilir
}

  

}
