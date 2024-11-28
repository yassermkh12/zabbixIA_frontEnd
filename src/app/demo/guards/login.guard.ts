import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token : String|null = localStorage.getItem('token');
  const refrechToken : String|null  = localStorage.getItem('refrechToken');

  if((token != null || refrechToken != null) ){
    router.navigate(['/apps/chat']);
    return false;
  }
  return true;
};
