import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  code: string[] = ['', '', '', '', '', ''];

  focusNext(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < 5) {
      const nextInput = input.parentElement.children[index + 1];
      nextInput.focus();
    }
  }

  isCodeComplete(): boolean {
    return this.code.every(d => d.trim().length === 1);
  }

  verifyCode() {
    const finalCode = this.code.join('');
    // Buraya verify API çağrısı yapılacak
    console.log('Girilen kod:', finalCode);
    // this.httpService.verifySmsCode(phoneNumber, finalCode).subscribe(...)
  }
}

