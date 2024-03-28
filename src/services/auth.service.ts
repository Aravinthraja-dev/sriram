import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/model/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(private afs: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afs.authState;
   }

  signInWithGoogle(){
    let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/dashboard';
    localStorage.setItem('returnUrl',returnUrl);

    return this.afs.signInWithPopup(new GoogleAuthProvider());
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
