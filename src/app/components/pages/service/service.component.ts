import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ImageForm } from 'src/app/shared/model/image-form';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ServiceComponent implements OnInit {
  construction = "assets/construction.jpg";
  highway = "assets/highwaySer.jpg";
  education = "assets/education.jpg";
  thar = "assets/thar.jpg";
  concrete = "assets/concrete.jpg";
  iocl = "assets/iocl.jpg"
  isHovered: boolean = false;


  serviceBanner: Partial<ImageForm> = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  };

  public isCollapsed = true;

  isActive = "other";

  windowWidth = window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  cards = [
    {
      title: 'Construction',
      subTitle: 'Building Excellence',
      image: "assets/construction.jpg",
      description: 'We specialize in residential, commercial, and industrial construction, delivering high-quality projects on time and within budget, with comprehensive services including structural design and planning, foundation and framing, interior and exterior finishing, plus quality assurance and safety compliance.',
      cta: 'Let’s build your vision!'
    },
    {
      title: 'National Highways',
      subTitle: 'Roads & Infrastructure',
      image: "assets/highwaySer.jpg",
      description: 'We provide durable and sustainable infrastructure solutions for national highways including asphalt paving and repair, drainage systems, signage and safety barriers, plus routine maintenance and resurfacing to ensure safe and efficient transportation networks.',
      cta: 'Smooth roads for better journeys!'
    },
    {
      title: 'Asphalt Plant',
      subTitle: 'Premium Asphalt Solutions',
      image: "assets/thar.jpg",
      description: 'Our state-of-the-art asphalt plants produce high-grade materials for road construction, parking lots, driveways and pavements, with custom mixes designed for maximum durability to meet all your construction surfacing needs.',
      cta: 'Quality asphalt, seamless roads!'
    },
    {
      title: 'Educational Institutions',
      subTitle: 'Building Future Minds',
      image: "assets/education.jpg",
      description: 'We construct schools, colleges, and training centers with earthquake-resistant designs, smart classrooms and labs, eco-friendly materials, and ADA-compliant accessibility features to create safe, modern, and inclusive educational environments.',
      cta: 'Building spaces for learning!'
    },
    {
      title: 'Concrete Products',
      subTitle: 'Precision Concrete Works',
      image: "assets/concrete.jpg",
      description: 'We manufacture high-quality precast concrete products including beams, columns and slabs, pavers and retaining walls, decorative concrete elements, and custom solutions to meet the specific requirements of your construction projects.',
      cta: 'Strong foundations, lasting structures!'
    },
    {
      title: 'IOCL Dealer',
      subTitle: 'Energy Infrastructure',
      image: "assets/iocl.jpg",
      description: 'Partnered with Indian Oil Corporation (IOCL), we deliver comprehensive fuel station construction, pipeline networks, storage tank installations, and safety-compliant designs that meet all industry standards and regulatory requirements.',
      cta: 'Powering progress with precision!'
    }
  ];

  selectedCard: any = null;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getAll().subscribe(data => {
      this.serviceBanner = data.find(
        item => item.PageCategory === 'service' && item.PageSubCategory === 'serviceBanner'
      ) as ImageForm;
    })
  }

  showDetails(card: any, event: Event) {
    event.preventDefault();
    this.selectedCard = this.selectedCard === card ? null : card;
  }
}
