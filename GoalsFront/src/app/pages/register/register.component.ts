import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    constructor(
    private registerService: RegisterService,
    private router: Router,
  ) {}

  base64Image: string = '';
  showTermsModal = false;
  isScrolledToBottom = false;
  
  // Gerçek zamanlı validasyon için flag'ler
  emailTouched = false;
  passwordTouched = false;
  confirmPasswordTouched = false;
  
  registerData = {
    UserName: '',
    UserEmail: '',
    UserPassword: '',
    ConfirmPassword: '',
    UserPhoneNumber: '',
    Terms: false,
    Base64Image: ''
  };

  // Email input eventi
  onEmailInput() {
    this.emailTouched = true;
  }

  // Email blur eventi
  onEmailBlur() {
    this.emailTouched = true;
  }

  // Password input eventi
  onPasswordInput() {
    this.passwordTouched = true;
    // Şifre değiştiğinde confirm password'u da kontrol et
    if (this.confirmPasswordTouched) {
      this.confirmPasswordTouched = true;
    }
  }

  // Password blur eventi
  onPasswordBlur() {
    this.passwordTouched = true;
  }

  // Confirm password input eventi
  onConfirmPasswordInput() {
    this.confirmPasswordTouched = true;
  }

  // Confirm password blur eventi
  onConfirmPasswordBlur() {
    this.confirmPasswordTouched = true;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.registerData.Base64Image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

register() {
  if (!this.isFormValid()) return;

  this.registerService.register(this.registerData); // ✅ formdan gelen data burada

  this.router.navigate(['/verify']);
}

  // Form geçerlilik kontrolü
  isFormValid(): boolean {
    return (
      this.validateUserName(this.registerData.UserName) &&
      this.registerData.UserName.trim() !== '' &&
      this.validateEmail(this.registerData.UserEmail) &&
      this.validatePassword(this.registerData.UserPassword) &&
      this.registerData.UserPassword === this.registerData.ConfirmPassword &&
      this.validatePhone(this.registerData.UserPhoneNumber) &&
      this.registerData.Terms
    );
  }

  validateUserName(name: string): boolean {
  if (!name) return false;
  const regex = /^[A-Za-zÇçĞğİıÖöŞşÜü\s]{2,}$/u;
  return regex.test(name.trim());
}

  validateEmail(email: string): boolean {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password: string): boolean {
    if (!password) return false;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  }

  phoneTouched = false;

validatePhone(phone: string): boolean {
  if (!phone) return false;
  const regex = /^05\d{9}$/; // Türkiye GSM numarası (05xxxxxxxxx)
  return regex.test(phone.trim());
}

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const threshold = 5; // 5px tolerans
    
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - threshold) {
      this.isScrolledToBottom = true;
    }
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('tr-TR');
  }


  onTermsCheckboxChange(event: Event) {
  const checkbox = event.target as HTMLInputElement;

  if (checkbox.checked) {
    // Checkbox işaretlenince modal aç, ama checkbox'ı şimdilik pasif yap
    this.openTermsModal();
    this.registerData.Terms = false;
  }
}

openTermsModal() {
  this.showTermsModal = true;
  this.isScrolledToBottom = false;
}

closeTermsModal() {
  this.showTermsModal = false;
  this.isScrolledToBottom = false;

  // Eğer kullanıcı henüz kabul etmediyse checkbox'ı geri kaldır
  if (!this.registerData.Terms) {
    const checkbox = document.querySelector('input[name="Terms"]') as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }
}

acceptTerms() {
  this.registerData.Terms = true;
  this.closeTermsModal();
}
}


