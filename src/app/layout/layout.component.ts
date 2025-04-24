import { Component, HostListener, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet, NgxSpinnerModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  constructor(
    private spinner: NgxSpinnerService,
    private loader: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loader.loadingOn();

    setTimeout(() => {
      this.loader.loadingOff();
    }, 5000)

    this.loader.loading$.subscribe((isLoading) => {
      if(isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide()
      }
    })
  }


  @HostListener('document: keydown', ['$event'])
  openLoginPage(event: KeyboardEvent) {
    if(event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.spinner.show();

      setTimeout(() => {
        this.router.navigate(['/login']).then(() => {
          this.spinner.hide();
        }).catch(error => {
          console.error('Navigation error:', error);
          this.spinner.hide();
        });
      },300)
    }
  } 
}
