import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-mainabout',
    templateUrl: './mainabout.component.html',
    styleUrls: ['./mainabout.component.css'],
    standalone: true,
    imports: [NgStyle]
})
export class MainaboutComponent {
  about = "assets/about.jpg"
  bgabout = "assets/background.jpg"

  constructor(private router: Router) { }

  gotoAbout(){
    this.router.navigate(["/about"])
  }
}
