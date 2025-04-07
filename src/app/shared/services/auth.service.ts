import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
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
    private router: Router) 
    {
      this.user$ = afs.authState.pipe(
        switchMap(user => {
          if(user) {
            localStorage.setItem('user', JSON.stringify(user));
            return of(user);
          }else {
            const storedUser = localStorage.getItem('user');
            if(storedUser){
              return of(JSON.parse(storedUser));
            }else {
              return of(null);
            }
          }
      })
    );   
    }

    signInWithGoogle(){
      let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/dashboard';
      localStorage.setItem('returnUrl',returnUrl);
  
      return this.afs.signInWithPopup(new GoogleAuthProvider()).then(result => {
        const user = result.user;
        if(user && this.allowedEmails.includes(user.email!)){
          localStorage.setItem('user', JSON.stringify(user));
          console.log('Sign in successful, navigating to:', returnUrl);
          this.router.navigate([returnUrl]).catch(error => console.error('Navigation error:', error));
        }
        else{
          this.afs.signOut();
          alert('Access denied: Your account is not allowed to access this application.');
        }
      }).catch(error => {
        console.error('Sign-in error:', error);
      });
    }
  
    logout(){
      localStorage.removeItem('user');
      return this.afs.signOut().then(() => {
        this.router.navigate(['/home']).then(() => {
          console.log('Navigation to /home successful');
        });
      });
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
