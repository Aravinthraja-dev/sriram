import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AchivementsComponent } from './achivements/achivements.component';
import { MainprojectComponent } from './mainproject/mainproject.component';
import { MainaboutComponent } from './mainabout/mainabout.component';
import { MainserviceComponent } from './mainservice/mainservice.component';
import { BannerComponent } from './banner/banner.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [BannerComponent, MainserviceComponent, MainaboutComponent, MainprojectComponent, AchivementsComponent]
})
export class HomeComponent {
  

  constructor() { }
  
}
