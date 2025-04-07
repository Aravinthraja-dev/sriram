import { Component } from '@angular/core';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css'],
    standalone: true,
    imports: []
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

  cards = [
    {
      title: 'Construction',
      image: "assets/construction.jpg",
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      title: 'National Highways',
      image: "assets/highwaySer.jpg",
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      title: 'Asphalt Plant',
      image: "assets/thar.jpg",
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      title: 'Concrete Products',
      image: "assets/concrete.jpg",
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      title: 'Educational Institutions',
      image: "assets/education.jpg",
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      title: 'IOCL Dealer',
      image: "assets/iocl.jpg",
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    }
  ];

  selectedCard: any = null;

  showDetails(card: any, event:Event) {
    event.preventDefault();
    this.selectedCard = this.selectedCard === card ? null : card;
  }
}
