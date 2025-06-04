import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'u-input',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './u-input.component.html',
  styleUrls: ['./u-input.component.scss']
})
export class UInputComponent {
  @Input({required:true}) caption!: string;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  
  private _value: string = '';



  @Input()
set value(val: string | undefined) {
  const sanitized = val ?? '';
  if (sanitized !== this._value) {
    this._value = sanitized;
    this.valueChange.emit(sanitized);
  }
}

get value(): string {
  return this._value ?? '';
}

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.value = input;
  }
}