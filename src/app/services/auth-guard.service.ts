import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth:AuthService, private router: Router) { }

  canActivate(route: any, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
        if (user) {
          return true; 
        } 
        else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); 
          return false;
        }
      })
    );
  }
}
