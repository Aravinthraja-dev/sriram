import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css'],
    standalone: true,
    imports: [NgIf, NgbCarousel, NgFor, NgbSlide]
})
export class BannerComponent {
  imageUrls: SafeResourceUrl[];
  titleNames: string[] = ['beach', 'boat', 'forest'];

  constructor(private sanitizer: DomSanitizer) {
    const imageNames = ['banner1', 'banner2', 'banner3'];
    this.imageUrls = imageNames.map((imageName) =>
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${imageName}.jpg`)
    );
  }

  windowWidth = window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  onSlide(slideEvent: any) {
    const currentIndex = slideEvent.current;
    const currentTitle = this.titleNames[currentIndex];
  }
}
