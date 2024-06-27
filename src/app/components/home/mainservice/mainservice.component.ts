import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainservice',
  templateUrl: './mainservice.component.html',
  styleUrls: ['./mainservice.component.css']
})
export class MainserviceComponent {
  buliding = "assets/bulding.jpg";
  highway = "assets/highway.jpg";

  constructor(private router: Router) { }
  gotoService(){
    this.router.navigate(['/service']);
  }
}
