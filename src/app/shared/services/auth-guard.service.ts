import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth:AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => {
        if (user) {
          console.log('AuthGuard: User is authenticated', user);
          return true; 
        } 
        else {
          console.log('AuthGuard: User not authenticated, redirecting to home');
          this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } }); 
          return false;
        }
      })
    );
  }
}
