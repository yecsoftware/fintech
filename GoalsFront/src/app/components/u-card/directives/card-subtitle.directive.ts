
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cardSubtitle]'
})
export class CardSubtitleDirective {
  constructor( public templateRef: TemplateRef<any>){}
}


