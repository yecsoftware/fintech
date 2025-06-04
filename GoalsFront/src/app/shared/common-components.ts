import { UButtonComponent } from '../components/u-button/u-button.component';
import { UCheckboxComponent } from '../components/u-checkbox/u-checkbox.component';
import { UColumnComponent } from '../components/u-column/u-column.component';
import { UInputComponent } from '../components/u-input/u-input.component';
import { URowComponent } from '../components/u-row/u-row.component';
import { USelectComponent } from '../components/u-select/u-select.component';
import { UExpansionPanelComponent } from '../components/u-expansion-panel/u-expansion-panel.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionPanelContentDirective } from '../components/u-expansion-panel/directives/expansion-panel-content.directive';
import { ExpansionPanelHeaderDirective } from '../components/u-expansion-panel/directives/expansion-panel-header.directive';
import { ExpansionPanelFooterDirective } from '../components/u-expansion-panel/directives/expansion-panel-footer.directive';
import { UDatepickerComponent } from '../components/u-datepicker/u-datepicker.component';

export const COMMON_COMPONENTS = [
  UButtonComponent,
  UCheckboxComponent,
  UInputComponent,
  URowComponent,
  UColumnComponent,
  USelectComponent,
  UExpansionPanelComponent,
  CommonModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  ExpansionPanelContentDirective,
  ExpansionPanelHeaderDirective,
  ExpansionPanelFooterDirective,
  UDatepickerComponent,
  
   ];