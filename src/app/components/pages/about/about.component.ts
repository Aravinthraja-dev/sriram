import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: true,
    imports: [FooterComponent]
})
export class AboutComponent {
  aboutBanner = "assets/aboutBanner.jpg"
}
