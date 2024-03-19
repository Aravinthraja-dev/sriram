import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sriram';

  constructor(private auth: AuthService, router: Router, userService: UserService, ) { 
    auth.user$.subscribe((user:any) => {
      if(!user) return;
        userService.save(user);
        
      let returnUrl  = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
   
    });
  }
}
