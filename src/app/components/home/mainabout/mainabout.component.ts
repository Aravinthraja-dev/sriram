import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { ImageService } from 'src/app/shared/services/image.service';
import { ImageForm } from 'src/app/shared/model/image-form';
import { ScrollAnimateDirective } from 'src/app/shared/directives/scrollAnimate';

@Component({
  selector: 'app-mainabout',
  templateUrl: './mainabout.component.html',
  styleUrls: ['./mainabout.component.css'],
  standalone: true,
  imports: [NgStyle, ScrollAnimateDirective]
})
export class MainaboutComponent implements OnInit {
  bgabout = "assets/background.jpg"

  about: ImageForm = {
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
      this.about = data.find(
        item => item.PageCategory === 'home' && item.PageSubCategory === 'about'
      ) as ImageForm;
    })
  }

  gotoAbout() {
    this.router.navigate(["/about"])
  }
}
