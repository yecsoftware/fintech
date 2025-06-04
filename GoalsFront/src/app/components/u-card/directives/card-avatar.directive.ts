
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cardAvatar]'
})
export class CardAvatarDirective {
  constructor( public templateRef: TemplateRef<any>){}
}
