import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterOutlet } from '@angular/router';
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

  constructor(private auth: AuthService, private router: Router, public userService: UserService, private route: ActivatedRoute) { 

    this.auth.user$.subscribe((user:any) => {
      if(!user) return;

      userService.save(user);
        
      let returnUrl  = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
        localStorage.removeItem('returnUrl');
        console.log('Navigating to:',returnUrl)
        this.router.navigateByUrl(returnUrl).catch(error => console.error('Navigation error:', error))
    });
  }
  ngOnInit(): void {
    this.checkAuthentication();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        window.scrollTo(0,0);
      }
    })
  }

  private checkAuthentication(){
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      this.auth.user$.subscribe(user => {
        if(user) {
          this.router.navigate(['/admin/dashboard']).catch(error => console.error('Navigation error:', error));
        } else {
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
