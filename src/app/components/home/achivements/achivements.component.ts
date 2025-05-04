import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-achivements',
    templateUrl: './achivements.component.html',
    styleUrl: './achivements.component.css',
    standalone: true,
    imports: []
})
export class AchivementsComponent implements AfterViewInit{
  @ViewChild('achievementsSection') achievementsSection!: ElementRef;

  bgabout = "assets/achiveBackground.jpg"

  projectsComplete = 0;
  workersEmployed = 0;
  satisfiedClients = 0;

  readonly targetProjects = 240;
  readonly targetWorkers = 426;
  readonly targetClients = 141;

  readonly animationDuration = 5000; 

  private observer!: IntersectionObserver;
  private animationFrameId!: number;

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCountAnimation();
          this.observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px' // Adjust this to trigger earlier/later
    });

    this.observer.observe(this.achievementsSection  .nativeElement);
  }

  startCountAnimation() {
    const startTime = performance.now();
    const endTime = startTime + this.animationDuration;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);
      const easedProgress = this.easeOutQuad(progress);

      this.projectsComplete = Math.floor(easedProgress * this.targetProjects);
      this.workersEmployed = Math.floor(easedProgress * this.targetWorkers);
      this.satisfiedClients = Math.floor(easedProgress * this.targetClients);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.setFinalValues();
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  private setFinalValues() {
    this.projectsComplete = this.targetProjects;
    this.workersEmployed = this.targetWorkers;
    this.satisfiedClients = this.targetClients;
  }
}
