import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { LoadingInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('authInterceptor', () => {
  // const interceptor: HttpInterceptorFn = (req, next) => 
  //   TestBed.runInInjectionContext(() => new LoadingInterceptor().intercept(req, next));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  // });

  // it('should be created', () => {
  //   expect(interceptor).toBeTruthy();
  // });
});
