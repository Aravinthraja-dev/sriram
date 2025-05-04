import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor } from '@angular/common';
import { ImageService } from 'src/app/shared/services/image.service';
import { ImageForm } from 'src/app/shared/model/image-form';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css'],
    standalone: true,
    imports: [NgIf, NgbCarousel, NgFor, NgbSlide]
})
export class BannerComponent implements OnInit{
  imageUrls!: SafeResourceUrl[];
  titleNames: string[] = [];

  constructor(
    private sanitizer: DomSanitizer, 
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.imageService.getAll().subscribe((data: any) => {
      const bannarArray = Object.values(data);

      const homeBanners = bannarArray
        .filter((banner: any) => banner.PageCategory === 'home' && banner.PageSubCategory.startsWith('homeBanner'))
        .sort((a :any , b : any) => a.PageSubCategory.localeCompare(b.PageSubCategory));

      this.imageUrls = homeBanners.map((imageName: any) =>
        this.sanitizer.bypassSecurityTrustResourceUrl(imageName.image));

      this.titleNames = homeBanners.map((banner:any) => banner.imageTitle)
    })
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
