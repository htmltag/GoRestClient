import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem("api_token");
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
