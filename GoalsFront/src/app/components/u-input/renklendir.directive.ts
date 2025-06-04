import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[renklendir]'
})
export class RenklendirDirective {

  @Input("renklendir") color: string | undefined ;
  @Input("test") name: string | undefined ;

  constructor(private el: ElementRef ) { }

  @HostListener("mouseenter") mouseenter() {
    console.log(this.name);
    console.log(this.color);
    this.el.nativeElement.innerHTML = this.name;
    this.el.nativeElement.style.color = "red";
    
    console.log("mouse elementin üzerine geldi");
  }
  @HostListener("mouseleave") mouseleave() {
    this.el.nativeElement.innerHTML = "home works!";
    this.el.nativeElement.style.color = "black";
    console.log("mouse elementin üzerinde değil");
  }

}
