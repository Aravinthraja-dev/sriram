import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    
  constructor(public auth: AuthService, private route: Router) { }

  isCollapsed = true;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.auth.logout().then((res:any) => {
      this.auth.isAdminLoggedIn = false;
      this.auth.isUserLoggedIn = true;
      this.route.navigate(['/']);

    }).catch((error:any)=>{
      console.error(error);
    });
  }
}