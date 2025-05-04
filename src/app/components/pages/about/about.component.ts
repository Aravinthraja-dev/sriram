import { Component, OnInit } from '@angular/core';
import { ImageForm } from 'src/app/shared/model/image-form';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: []
})
export class AboutComponent implements OnInit {
  aboutBanner: ImageForm = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  };
  ourstory: ImageForm = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  }

  whoweare: ImageForm = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  }

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getAll().subscribe(data => {
      this.aboutBanner = data.find(
        item => item.PageCategory === 'about' && item.PageSubCategory === 'aboutBanner'
      ) as ImageForm;

      this.ourstory = data.find(
        item => item.PageCategory === 'about' && item.PageSubCategory === 'ourstory'
      ) as ImageForm

      this.whoweare = data.find(
        item => item.PageCategory === 'about' && item.PageSubCategory === 'whoweare'
      ) as ImageForm
    })
  }
}
