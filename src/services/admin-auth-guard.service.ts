import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth:AuthService, private userService: UserService) { }

  
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
       map(appUser => (<any>appUser).isAdmin));   
 }
}
