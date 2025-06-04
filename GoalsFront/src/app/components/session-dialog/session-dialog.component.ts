import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-session-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Oturum Süresi Bitmek Üzere</h2>
    <mat-dialog-content>
      Oturum süreniz {{ countdown }} saniye içinde sona erecek. Uzatmak ister misiniz?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="logout()">Hayır</button>
      <button mat-button color="primary" (click)="extendSession()">Evet</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class SessionDialogComponent {
  countdown = 30;
  interval: any;

  constructor(
    public dialogRef: MatDialogRef<SessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.startCountdown();
  }

  startCountdown() {
    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.dialogRef.close(false);
        clearInterval(this.interval);
      }
    }, 1000);
  }

  extendSession() {
    clearInterval(this.interval);
    this.dialogRef.close(true);
  }

  logout() {
    clearInterval(this.interval);
    this.dialogRef.close(false);
  }
}
