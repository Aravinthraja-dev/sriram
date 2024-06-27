import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainabout',
  templateUrl: './mainabout.component.html',
  styleUrls: ['./mainabout.component.css']
})
export class MainaboutComponent {
  about = "assets/about.jpg"
  bgabout = "assets/background.jpg"

  constructor(private router: Router) { }

  gotoAbout(){
    this.router.navigate(["/about"])
  }
}
