import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollAnimateDirective } from 'src/app/shared/directives/scrollAnimate';
import { ImageForm } from 'src/app/shared/model/image-form';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
    selector: 'app-mainservice',
    templateUrl: './mainservice.component.html',
    styleUrls: ['./mainservice.component.css'],
    imports: [ScrollAnimateDirective],
    standalone: true,
})
export class MainserviceComponent implements OnInit{
  buliding: Partial<ImageForm> = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  }; 
  highway:Partial <ImageForm> = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  };

  constructor(
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.imageService.getAll().subscribe(data => {
      this.buliding = data.find(
        item => item.PageCategory === 'home' && item.PageSubCategory === 'construction'
      ) as ImageForm;
      
      this.highway = data.find(
        item => item.PageCategory === 'home' && item.PageSubCategory === 'highways'
      ) as ImageForm
    })
  }

  gotoService(){
    this.router.navigate(['/service']);
  }
}
