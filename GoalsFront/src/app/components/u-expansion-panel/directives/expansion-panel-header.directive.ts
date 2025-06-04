import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[expansionPanelHeader]'
})
export class ExpansionPanelHeaderDirective {

  constructor( public templateRef: TemplateRef<any>) { }

}
