import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/model/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser | any;
  status$;
  isCollapsed = true;
  
  constructor(
    public auth: AuthService, 
    private router: Router,
    statusService: StatusService,
    ) { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.status$ = statusService.getStatus();
  }

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