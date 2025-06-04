
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cardTitle]'
})
export class CardTitleDirective {
  constructor( public templateRef: TemplateRef<any>){}
}