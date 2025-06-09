import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // Eğer cookies modülü kullanıyorsanız

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router : Router , private http:HttpClient,private cookieService: CookieService) { }


  logout = () => {
    console.log('Çıkış yapılıyor...');
    localStorage.clear();
    sessionStorage.clear();
    this.cookieService.deleteAll(); // Eğer cookies modülü kullanıyorsanız
    this.router.navigate(['/login']);
  }
}
