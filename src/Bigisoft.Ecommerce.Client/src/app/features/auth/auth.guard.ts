import { CanActivateFn, Router } from '@angular/router';
import { AuthUser } from 'aws-amplify/auth';
import {AuthService} from "./AuthService";
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  try {
    await authService.getCurrentUser();
    return true; // User is authenticated
  } catch (error) {
    await router.navigate(['/auth']);
    return false; // User is not authenticated
  }
};
