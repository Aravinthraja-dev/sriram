import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/model/app-user';
import { AuthService } from 'src/services/auth.service';
import { StatusService } from 'src/services/status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser | any;
  status$;
  
  constructor(
    public auth: AuthService, 
    private router: Router,
    statusService: StatusService 
    ) { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.status$ = statusService.getStatus();
  }

  isCollapsed = true;
  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.auth.logout().then((res:any) => {
      this.router.navigate(['/']);
    }).catch((error:any)=>{
      console.error(error);
    });
  }
}