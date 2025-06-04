import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'u-column',
  imports : [],
  templateUrl: './u-column.component.html',
  styleUrl: './u-column.component.scss',
})
export class UColumnComponent {
  private _width = 100;
  @Input() align?: 'end' | 'start' | 'center'| 'bottom';
  //@Input() align?: 'start' | 'center' | 'end';

  // 🔸 dışarıdan `[width]="30"` gibi input al
  @Input() set width(value: number) {
    if (value >= 0 && value <= 100) {
      this._width = value;
    }
  }

  // 🔸 class'ı dinamik olarak bind et → f-width-30 gibi
  @HostBinding('class')
  get hostClasses(): string {
    const widthClass = `f-width-${this._width}`;
    //const alignClass = this.align ? `align-${this.align}` : '';
    return `u-column ${widthClass} `.trim();

    //${alignClass}
  }
}