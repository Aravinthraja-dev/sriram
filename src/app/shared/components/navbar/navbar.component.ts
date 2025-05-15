import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from 'src/app/shared/model/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { LoaderService } from '../../services/loader.service';
import { ContactServiceService } from '../../services/contact-service.service';
import { ContactForm } from '../../model/contact-form';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbCollapse, RouterLink, DatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | any;
  status$;
  isCollapsed = true;
  isLoading = true;
  isMobile = true;
  unreadMessages: ContactForm[] = [];
  secretTapCount = 0;
  lastTapTime = 0;

  showNotifications!: boolean;
  messages: any;
  unreadCount = 0;

  constructor(
    public auth: AuthService,
    private router: Router,
    public statusService: StatusService,
    private loader: LoaderService,
    private contactService: ContactServiceService
  ) {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.isLoading = false;
    });
    this.status$ = statusService.getStatus();
  }

  ngOnInit(): void {
    this.contactService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });
    
    this.contactService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (err) => console.error('Message fetch error:', err)
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.auth.logout().then((res: any) => {
      this.router.navigate(['/home']);
    }).catch((error: any) => {
      console.error(error);
    });
  }

  navigateToRoute(route: string) {
    this.loader.loadingOn();
    setTimeout(() => {
      this.router.navigate([`${`/${route}`}`]).then((success) => {
        if (success) {
          this.loader.loadingOff();
        } else {
          this.loader.loadingOn();
        }
      })
    }, 1500)
    this.toggleNavbar();
  }

  navigateToQuaryParmas(route: string, queryParams: any) {
    this.loader.loadingOn();
    setTimeout(() => {
      this.router.navigate([`${`/${route}`}`], { queryParams }).then((success) => {
        if (success) {
          this.loader.loadingOff();
        } else {
          this.loader.loadingOn();
        }
      })
    }, 1000)
  }

  isActive(routeOrKey: string): boolean {
    return this.router.url === routeOrKey;
  }

  handleSecretTap() {
    const now = Date.now();
    if (now - this.lastTapTime < 1000) {
      this.secretTapCount++;
    } else {
      this.secretTapCount = 1
    }
    this.lastTapTime = now;

    if (this.secretTapCount === 5) {
      this.router.navigate(['/login']);
      this.secretTapCount = 0;
    }

    if (this.appUser) {
      this.auth.logout();
    }
  }

  viewMessage(message: any) {
    if (!message.isRead) {
      this.contactService.markAsRead(message.id);
    }
    // Add your navigation logic here
  }

  markAllAsRead() {
    this.contactService.getUnreadMessages().subscribe(messages => {
      messages.forEach(message => {
        this.contactService.markAsRead(message.id);
      });
    });
  }

  ngOnDestroy() {
  }
}