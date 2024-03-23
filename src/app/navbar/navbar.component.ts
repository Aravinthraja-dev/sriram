import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/model/app-user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser | any;
   
  
  constructor(public auth: AuthService, private route: Router) { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  isCollapsed = true;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.auth.logout().then((res:any) => {
      this.route.navigate(['/']);
    }).catch((error:any)=>{
      console.error(error);
    });
  }
}