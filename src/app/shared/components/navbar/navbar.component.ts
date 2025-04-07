import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from 'src/app/shared/model/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbCollapse, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser | any;
  status$;
  isCollapsed = true;
  isLoading = true;
  isMobile = true;
  
  constructor(
    public auth: AuthService, 
    private router: Router,
    public statusService: StatusService,
    private loader: LoaderService
    ) { 
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.isLoading = false;
    });
    this.status$ = statusService.getStatus();
  }

  @HostListener('window:resize',['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }  

  toggleDropdown(event: Event, dropdown: HTMLLIElement) {
    if (this.isMobile) {
      event.preventDefault(); // Prevent default navigation
      dropdown.classList.toggle('show'); // Toggle dropdown
    }
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.auth.logout().then((res:any) => {
      this.router.navigate(['/home']);
    }).catch((error:any)=>{
      console.error(error);
    });
  }

  navigateToRoute(route: string) {
    this.loader.loadingOn();
    setTimeout(() => {
      this.router.navigate([`${`/${route}`}`]).then((success) => {
        if(success) {
          this.loader.loadingOff();
        } else {
          this.loader.loadingOn();
        }
      })
    },1500)
    this.toggleNavbar();
  }

  navigateToQuaryParmas(route: string, queryParams: any) {
    this.loader.loadingOn();
    setTimeout(() => {
      this.router.navigate([`${`/${route}`}`], { queryParams }).then((success) => {
        if(success) {
          this.loader.loadingOff();
        } else {
          this.loader.loadingOn();
        }
      })
    },1000)
  }

  isActive(routeOrKey: string): boolean {
    return this.router.url === routeOrKey;
  }
}