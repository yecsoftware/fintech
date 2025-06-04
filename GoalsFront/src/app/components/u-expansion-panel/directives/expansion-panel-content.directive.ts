
import { Directive, ElementRef, Renderer2, AfterViewInit,TemplateRef } from '@angular/core';

@Directive({
  selector: '[expansionPanelContent]'
})
export class ExpansionPanelContentDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2,public templateRef: TemplateRef<any>) {}

  ngAfterViewInit() {
    const divider = this.renderer.createElement('div');
    this.renderer.addClass(divider, 'u-divider');

    // İçeriğin üstüne çizgi ekle
    this.renderer.insertBefore(
      this.el.nativeElement.parentNode,
      divider,
      this.el.nativeElement
    );
  }
}
