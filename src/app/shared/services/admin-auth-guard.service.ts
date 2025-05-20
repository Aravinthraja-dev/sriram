import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private auth: AuthService, private router: Router) { }


  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      take(1),
      map(appUser => {
        if (appUser && appUser.isAdmin) return true;

        this.router.navigate(['/home']);
        return false;
      })
    )
  }
}
