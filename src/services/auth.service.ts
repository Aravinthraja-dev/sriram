import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;
  isUserLoggedIn = true;
  isAdminLoggedIn = false;

  constructor(private afs: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afs.authState;
   }

  signInWithGoogle(){
    let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    localStorage.setItem('returnUrl',returnUrl);

    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }

  registerWithEmailAndPassword(user: {email: string, password: string}){
    return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  }

  signInWithEmailAndPassword(user: {email: string, password: string}){
    return this.afs.signInWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    return this.afs.signOut();
  }
}
