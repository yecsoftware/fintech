import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'u-datepicker',
  standalone: true,
  templateUrl: './u-datepicker.component.html',
  styleUrl: './u-datepicker.component.scss',
  imports: [CommonModule ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UDatepickerComponent),
      multi: true
    }
  ]
})
export class UDatepickerComponent implements ControlValueAccessor {
  @Input({required:true}) caption!: string;
  @Input() disabled: boolean = false;
  @Output() dateChange = new EventEmitter<string>();

  value: string = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.dateChange.emit(this.value);
  }
}

