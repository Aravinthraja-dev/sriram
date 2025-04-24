import { Component, TemplateRef } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { filter } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";


@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    providers: [NgbOffcanvas, NgbOffcanvasConfig]
})

export class AdminComponent {
    constructor(
        config: NgbOffcanvasConfig,
        private offcanvasService: NgbOffcanvas,
        private router: Router,
        private auth: AuthService
    ) {
        config.position = 'end';
        config.backdropClass = 'bg-info';
        config.keyboard = false;

        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
            this.offcanvasService.dismiss();
        })
    }

    open(content: TemplateRef<any>) {
        this.offcanvasService.open(content)
    }

    isActive(routeOrKey: string): boolean {
        return this.router.url === routeOrKey;
    }

    logout() {
        this.auth.logout().then((res: any) => {
            this.router.navigate(['/home']);
        }).catch((error: any) => {
            console.error(error);
        });
    }
}