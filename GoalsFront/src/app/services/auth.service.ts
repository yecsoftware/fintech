import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl  = 'http://localhost:5026/User/Login/login'; // API URL'si

  constructor(private router : Router , private http:HttpClient) { }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      
      // Doğru key ile rolü al
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    } catch (err) {
      console.error('Token decode hatası:', err);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  // login(userEmail: string, userPassword: string): Observable<any> {
  //   return this.http.post(this.apiUrl, { userEmail, userPassword });
  // }

  // getuser(token: string): Observable<any> {
  //   const headers = { Authorization: `Bearer ${token}` }; // Bearer token ile istek yapıyoruz
  //   this.http.get('http://localhost:5026/GetUserByAuth', { headers:{"authorization":"token"} }).subscribe(res=>{
  //     console.log(res); 
  //   });
  //   return this.http.get('http://localhost:5026/GetUserByAuth', { headers });
  // }

  isAuthenticated() {
    const token:string | null = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
