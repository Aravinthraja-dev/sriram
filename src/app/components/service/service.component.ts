import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  serviceBanner = "assets/service.jpg";
  construction = "assets/construction.jpg";
  highway = "assets/highwaySer.jpg";
  education = "assets/education.jpg";
  thar = "assets/thar.jpg";
  concrete = "assets/concrete.jpg";
  iocl = "assets/iocl.jpg"

  public isCollapsed = true;

  isActive = "other";
}
