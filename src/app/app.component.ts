import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sriram';

  constructor(private auth: AuthService, private router: Router, public userService: UserService) { 

    this.auth.user$.subscribe((user:any) => {
      if(!user) return;

      console.log('Appcomponent: User found in auth state:', user);
      userService.save(user);
        
      let returnUrl  = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
        localStorage.removeItem('returnUrl');
        console.log('Navigating to:',returnUrl)
        this.router.navigateByUrl(returnUrl).catch(error => console.error('Navigation error:', error))
    });

  }
  ngOnInit(): void {
    // this.checkAuthentication();
  }

  private checkAuthentication(){
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      this.auth.user$.subscribe(user => {
        if(user) {
          console.log('Authenticate user found:', user);
          this.router.navigate(['/admin/dashboard']).catch(error => console.error('Navigation error:', error));
        } else {
          console.log('No authenticated user found, navigating to home');
          this.router.navigate(['/home']).catch(error => console.error('Navigation error:', error));
        }
      });
    } else {
      this.router.navigate(['/home']).catch(error => console.error('Navigation error:', error));
    }
    
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    const isReloading = localStorage.getItem('isReloading');
    if(!isReloading){
      this.auth.logout();
    }
    localStorage.removeItem('isReloading');
  }

}
