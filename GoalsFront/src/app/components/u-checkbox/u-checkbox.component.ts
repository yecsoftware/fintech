import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ChangeDetectionStrategy,  model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'u-checkbox',
  imports: [FormsModule,MatCardModule, MatCheckboxModule, FormsModule, MatRadioModule],
  templateUrl: './u-checkbox.component.html',
  styleUrl: './u-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UCheckboxComponent {
  @Input() label: string = '';
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);

}
