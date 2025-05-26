import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, updateProfile, User, UserCredential, Auth, signInWithPopup } from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/shared/model/app-user';
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
    private router: Router,

  ) {
    this.user$ = this.afs.authState.pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return of(user);
        } else {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            return of(JSON.parse(storedUser));
          } else {
            return of(null);
          }
        }
      })
    );
  }

  async signInWithGoogle(): Promise<void> {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin';
    localStorage.setItem('returnUrl', returnUrl);

    const provider = new GoogleAuthProvider();
    try {
      const result = await this.afs.signInWithPopup(provider);
      this.handleSignInResult(result);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  private handleSignInResult(result: any): void {
    const user = result.user;
    if (!user) return;

    if (this.allowedEmails.includes(user.email)) {
      localStorage.setItem('user', JSON.stringify(user));
      const returnUrl = localStorage.getItem('returnUrl') || '/admin';
      this.router.navigate([returnUrl]);
    } else {
      this.afs.signOut();
      alert('Access denied: Unauthorized email.');
    }
  }

  logout() {
    localStorage.removeItem('user');
    return this.afs.signOut().then(() => {
      this.router.navigate(['/home']).then(() => {
        console.log('Navigation to /home successful');
      });
    });
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap(user => {
        if (user)
          return this.userService.get(<any>user.uid).valueChanges();

        return of(null)
      }))
  }


  async login(email: string, password: string) {
    try {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin';
      localStorage.setItem('returnUrl', returnUrl);

      const userCredential = await this.afs.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (!user) {
        await this.afs.signOut();
        alert('Access denied: Your account is not allowed to access this application.');
        return null;
      }

      localStorage.setItem('user', JSON.stringify(user));
      await this.router.navigate([returnUrl]);
      return user;

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register new user
  async register(email: string, password: string, username: string) {
    try {
      const userCredential = await this.afs.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: username })
      }

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  // Get current user
  getCurrentUser() {
    return this.afs.authState;
  }

}
