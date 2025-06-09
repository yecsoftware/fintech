import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  phoneNumber: string = '';  // kullanıcıdan alınacak
  code: string[] = ['', '', '', '', '', ''];
  message: string = '';
  loading = false;

  constructor(private http: HttpClient,private router:Router) {}

  focusNext(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < 5) {
      const nextInput = input.parentElement.children[index + 1];
      if (nextInput) nextInput.focus();
    }
  }

  isCodeComplete(): boolean {
    return this.code.every(d => d.trim().length === 1);
  }

verifyCode() {
  const finalCode = this.code.join('');
  const request = {
    UserPhoneNumber: this.phoneNumber,  // önceki ekrandan alman gerekir
    VerificationCode: finalCode
  };

  this.http.post('/api/user/verifySmsCode', request).subscribe({
    next: (res: any) => {
      if (res.isSuccess) {
        alert('Telefon doğrulandı!');
        this.router.navigate(['/login']);
      } else {
        alert('Kod yanlış veya zaten doğrulanmış!');
      }
    },
    error: () => alert('Sunucu hatası oluştu.')
  });
}

}


