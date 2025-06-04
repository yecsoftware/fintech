import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router : Router , private http:HttpClient) { }


  logout = () => {
    console.log('Çıkış yapılıyor...');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
