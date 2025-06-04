import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[validate]',
  standalone: true 
})
export class ValidateDirective {

  constructor(private el:ElementRef) { }
  ngAfterViewInit() {
    // Eğer directive bir input elementine atanmadıysa, hata almamak için kontrol et
    if (this.el.nativeElement.tagName === 'u-input') {
      this.el = this.el.nativeElement;
    } else {
      //console.error('appValidateInput directive sadece <input> elementlerine uygulanmalıdır!');
    }
  }

  @HostListener("keyup") keyup() {
    this.checkInputValidation(this.el.nativeElement);
  }

    checkInputValidation(element: any) {
    const valid = element.validity.valid;
    const id=element.id;
    const divEl = document.querySelector(`#${id}+div`)
    if(!valid) {
      element.classname = "invalid";
      divEl!.innerHTML = element.validationMessage;

    }else {
      element.classname= "";
      divEl!.innerHTML = "";
    }

  }

}
