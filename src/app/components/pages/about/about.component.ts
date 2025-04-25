import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: true,
    imports: []
})
export class AboutComponent {
  aboutBanner = "assets/aboutBanner.jpg"
}
