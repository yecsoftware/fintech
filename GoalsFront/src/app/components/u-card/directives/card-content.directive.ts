import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cardContent]'
})
export class CardContentDirective {
  constructor( public templateRef: TemplateRef<any>){}
}
