import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getUserRole();
  if (role === 'admin') {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};

