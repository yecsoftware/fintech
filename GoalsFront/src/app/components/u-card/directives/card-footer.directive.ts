import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cardFooter]'
})
export class CardFooterDirective {
  constructor( public templateRef: TemplateRef<any>){}
}
