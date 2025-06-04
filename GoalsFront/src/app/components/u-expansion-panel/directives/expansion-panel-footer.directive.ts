import { Directive,TemplateRef } from '@angular/core';

@Directive({
  selector: '[expansionPanelFooter]'
})
export class ExpansionPanelFooterDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
