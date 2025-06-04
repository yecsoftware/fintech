import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { getEnumList } from '../../core/utils/getenumlist';

@Component({
  selector: 'u-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatFormField,MatLabel,MatSelectModule,CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, MatIconModule],
  templateUrl: './u-select.component.html',
  styleUrls: ['./u-select.component.scss']
})
export class USelectComponent {
  @Input({required:true}) label!: string;
  @Input() items: any[] = [];
  @Input() valueKey: string = 'value';
  @Input() displayKey: string = 'label';
  @Input() model: any;
  @Input({required:true}) caption: string = '';
  @Output() modelChange = new EventEmitter<any>();
  @Input() options: { label: string, value: any }[] = [];
  @Input() formControl!: FormControl;




  onChange(event: any) {
    this.modelChange.emit(event.value);
  }
}