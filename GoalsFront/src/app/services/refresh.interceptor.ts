
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  const http = inject(HttpClient);
  const router = inject(Router);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Refresh token varsa yenile
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('userId');

        if (refreshToken && userId) {
          return http.post<any>('http://localhost:5026/User/Login/refresh-token', {
            userId,
            refreshToken
          }).pipe(
            switchMap(res => {
              // Yeni token'ları kaydet
              localStorage.setItem('token', res.accessToken);
              localStorage.setItem('refreshToken', res.refreshToken);

              // Orijinal isteği tekrar gönder
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`
                }
              });
              return next(newReq);
            }),
            catchError(() => {
              localStorage.clear();
              sessionStorage.clear();
              alert('Oturum süreniz doldu. Lütfen tekrar giriş yapınız.');
              router.navigate(['/login']);
              return throwError(() => new Error('Unauthorized'));
            })
          );
        } else {
          // Refresh token da yoksa direkt at
          localStorage.clear();
          sessionStorage.clear();
          alert('Oturum süreniz doldu. Lütfen tekrar giriş yapınız.');
          router.navigate(['/login']);
          return throwError(() => new Error('Unauthorized'));
        }
      }

      return throwError(() => err);
    })
  );
};

