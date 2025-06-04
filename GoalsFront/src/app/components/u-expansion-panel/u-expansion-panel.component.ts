import {ChangeDetectionStrategy, Component, ContentChild, Input, viewChild,signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ExpansionPanelHeaderDirective } from './directives/expansion-panel-header.directive';
import { ExpansionPanelContentDirective } from './directives/expansion-panel-content.directive';
import { ExpansionPanelFooterDirective } from './directives/expansion-panel-footer.directive';
import { COMMON_COMPONENTS } from '../../shared/common-components';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'u-expansion-panel',
  templateUrl: 'u-expansion-panel.component.html',
  styleUrl: 'u-expansion-panel.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ExpansionPanelContentDirective,
    ExpansionPanelHeaderDirective,
    ExpansionPanelFooterDirective,
    COMMON_COMPONENTS
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UExpansionPanelComponent {
  @Input() expanderDescription: string = ''; // Kart açıklaması
  @Input({required:true}) expanderTitle: string = ''; // Kart başlığı
  readonly panelOpenState = signal(false);

  @ContentChild(ExpansionPanelHeaderDirective) expansionpanelheader?: ExpansionPanelHeaderDirective;
  @ContentChild(ExpansionPanelContentDirective) expansionpanelcontent?: ExpansionPanelContentDirective;
  @ContentChild(ExpansionPanelFooterDirective) expansionpanelfooter?: ExpansionPanelFooterDirective;



  accordion = viewChild.required(MatAccordion);
}