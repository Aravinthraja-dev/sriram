import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare const L : any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  bannerurl = "assets/AboutBan.jpg";
  office = "assets/office.png";
  phone = "assets/phone.png";
  email = "assets/email.png"

  ngOnInit(): void {
    if(!navigator.geolocation){
      console.log('location is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        let map = L.map('map').setView([coords.latitude, coords.longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker = L.marker([coords.latitude, coords.longitude]).addTo(map);

        marker.bindPopup('<b>hi</b>').openPopup();
    });
    this.watchPosition();
  }
  watchPosition(){
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      if(position.coords.latitude === desLat){
        navigator.geolocation.clearWatch(id);
      }
    },(err) => {
      console.log(err);
    },{
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }

  form = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3)
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    message: new FormControl('',[
      Validators.required,
      Validators.minLength(10)
    ])
  });

  get all(){
    return this.form.controls;
  }

}
