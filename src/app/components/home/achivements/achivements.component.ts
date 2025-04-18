import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-achivements',
    templateUrl: './achivements.component.html',
    styleUrl: './achivements.component.css',
    standalone: true,
    imports: [NgStyle]
})
export class AchivementsComponent {
  bgabout = "assets/achiveBackground.jpg"

  projectComplete: number = 0;
  client:number = 0;
  workerEmployee = 0;

  projectCompleteCount: any = setInterval(() => {
    this.projectComplete++;

    if(this.projectComplete == 240){
      clearInterval(this.projectCompleteCount);
    }
  },50);

  clientCount: any = setInterval(() => {
    this.client++;

    if(this.client == 141){
      clearInterval(this.clientCount);
    }
  },50);

  workerEmployeeCount: any = setInterval(() => {
    this.workerEmployee++;

    if(this.workerEmployee == 546){
      clearInterval(this.workerEmployeeCount);
    }
  },50);
}
