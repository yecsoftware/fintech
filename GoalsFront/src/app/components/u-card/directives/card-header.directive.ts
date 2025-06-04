import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cardHeader]'
})
export class CardHeaderDirective {
  constructor( public templateRef: TemplateRef<any>){}
}