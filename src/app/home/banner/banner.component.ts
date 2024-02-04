import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  imageUrls: SafeResourceUrl[];

  constructor(private sanitizer: DomSanitizer) {
    const imageNames = ['banner1', 'banner2', 'banner3'];
    this.imageUrls = imageNames.map((imageName) =>
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${imageName}.jpg`)
    );
  }
}
