import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input } from '@angular/core'

@Directive({
    selector: '[scrollAnimate]',
    standalone: true
})

export class ScrollAnimateDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.render.addClass(this.el.nativeElement, 'visible');
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.1,  rootMargin: '0px 0px -100px 0px' }); // Reduced for easier triggering

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}