import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/model/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;
  
  private allowedEmails: string[] = [
    'aravinthraja63@gmail.com',
  ]

  constructor(
    private afs: AngularFireAuth, 
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router) 
    {
    this.user$ = afs.authState;
   }

  signInWithGoogle(){
    let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/dashboard';
    localStorage.setItem('returnUrl',returnUrl);

    return this.afs.signInWithPopup(new GoogleAuthProvider()).then(result => {
      const user = result.user;
      if(user && this.allowedEmails.includes(user.email!)){
        this.router.navigate([returnUrl]);
      }
      else{
        this.afs.signOut();
        alert('Access denied: Your account is not allowed to access this application.');
      }
    });
  }

  logout(){
    return this.afs.signOut();
  }

  get appUser$() : Observable<AppUser | null>{
    return this.user$.pipe(
      switchMap(user => {
        if(user)
          return this.userService.get(<any>user.uid).valueChanges();

        return of(null)
      }))   
    }
}
