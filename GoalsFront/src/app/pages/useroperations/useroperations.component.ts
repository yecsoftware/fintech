import { Component } from '@angular/core';
import { URowComponent } from '../../components/u-row/u-row.component';
import { Router, RouterOutlet } from '@angular/router';
import { UColumnComponent } from '../../components/u-column/u-column.component';
import { UExpansionPanelComponent } from '../../components/u-expansion-panel/u-expansion-panel.component';
import { USelectComponent } from '../../components/u-select/u-select.component';
import { UInputComponent } from '../../components/u-input/u-input.component';
import { COMMON_COMPONENTS } from '../../shared/common-components';
import { ExpansionPanelContentDirective } from '../../components/u-expansion-panel/directives/expansion-panel-content.directive';
import { ExpansionPanelFooterDirective } from '../../components/u-expansion-panel/directives/expansion-panel-footer.directive';
import { ExpansionPanelHeaderDirective } from '../../components/u-expansion-panel/directives/expansion-panel-header.directive';
import { Status } from '../../enums/statusenum';
import { getEnumList } from '../../core/utils/getenumlist';

@Component({
  selector: 'app-useroperations',
  imports: [URowComponent,RouterOutlet,UColumnComponent,UExpansionPanelComponent,USelectComponent,UInputComponent,COMMON_COMPONENTS,ExpansionPanelContentDirective,ExpansionPanelFooterDirective,ExpansionPanelHeaderDirective],
  templateUrl: './useroperations.component.html',
  styleUrl: './useroperations.component.scss'
})
export class UseroperationsComponent {

  constructor(private router: Router) {}
  
  Status = Status; 
  getEnumList = getEnumList; 

}
