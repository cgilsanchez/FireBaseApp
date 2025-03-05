import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverColor]'
})
export class HoverColorDirective {
  @Input('appHoverColor') hoverColor: string = 'blue';
  private originalColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.originalColor = this.el.nativeElement.style.color;
    this.renderer.setStyle(this.el.nativeElement, 'color', this.hoverColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.originalColor);
  }
}
