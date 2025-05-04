import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactForm } from 'src/app/shared/model/contact-form';
import { ImageForm } from 'src/app/shared/model/image-form';
import { ContactServiceService } from 'src/app/shared/services/contact-service.service';
import { ImageService } from 'src/app/shared/services/image.service';
declare const L: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  office = "assets/office.png";
  phone = "assets/phone.png";
  email = "assets/email.png";
  messageSent: boolean = false;
  latitude = '12.202011662906592'
  longitude = '78.32207100633755'

  bannerurl: ImageForm = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  }

  constructor(
    private contactApi: ContactServiceService,
    private route: Router,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    let map = L.map('map').setView([Number(this.latitude), Number(this.longitude)], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker([Number(this.latitude), Number(this.longitude)]).addTo(map);

    marker.bindPopup('<b>Sri Ram Contruction</b>').openPopup();

    this.imageService.getAll().subscribe(data => {
      this.bannerurl = data.find(
        item => item.PageCategory === 'contact' && item.PageSubCategory === 'contactBanner'
      ) as ImageForm;
    })
  }
  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      if (position.coords.latitude === desLat) {
        navigator.geolocation.clearWatch(id);
      }
    }, (err) => {
      console.log(err);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  })

  get all() {
    return this.form.controls;
  }

  onSubmit(contactForm: ContactForm) {
    this.contactApi.addUsers(contactForm)
      .then(() => {
        this.messageSent = true;
        this.form.reset();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        this.messageSent = false;
      });
  }
}

