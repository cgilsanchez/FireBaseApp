import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverColor]'
})
export class HoverColorDirective {
  @Input('appHoverColor') hoverColor: string = 'blue';
  private originalColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('🚀 Directiva `appHoverColor` cargada en:', this.el.nativeElement);
  }

  @HostListener('mouseenter') onMouseEnter() {
    console.log('🎨 Cambiando a color:', this.hoverColor);
    this.originalColor = this.el.nativeElement.style.color;
    this.renderer.setStyle(this.el.nativeElement, 'color', this.hoverColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('🔄 Restaurando color:', this.originalColor);
    this.renderer.setStyle(this.el.nativeElement, 'color', this.originalColor);
  }
}
