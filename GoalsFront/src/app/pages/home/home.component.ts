import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RenklendirDirective } from '../../components/u-input/renklendir.directive';
import { UButtonComponent } from "../../components/u-button/u-button.component";
import { UCardComponent } from '../../components/u-card/u-card.component';
import { URowComponent } from '../../components/u-row/u-row.component';
import { UExpansionPanelComponent } from '../../components/u-expansion-panel/u-expansion-panel.component';
import { CardAvatarDirective } from '../../components/u-card/directives/card-avatar.directive';
import { CardContentDirective } from '../../components/u-card/directives/card-content.directive';
import { CardFooterDirective } from '../../components/u-card/directives/card-footer.directive';
import { CardHeaderDirective } from '../../components/u-card/directives/card-header.directive';
import { CardSubtitleDirective } from '../../components/u-card/directives/card-subtitle.directive';
import { CardTitleDirective } from '../../components/u-card/directives/card-title.directive';
import { UColumnComponent } from '../../components/u-column/u-column.component';
import { UInputComponent } from '../../components/u-input/u-input.component';
import { FormsModule } from '@angular/forms';
import { UFormSectionComponent } from '../../components/u-form-section/u-form-section.component';
import { USelectComponent } from "../../components/u-select/u-select.component";
import { UListBoxComponent } from '../../components/u-list-box/u-list-box.component';

@Component({
  selector: 'app-home',
  imports: [RenklendirDirective, RouterOutlet, UButtonComponent,UCardComponent,URowComponent,UExpansionPanelComponent,UButtonComponent, FormsModule, UCardComponent, UInputComponent, UFormSectionComponent, USelectComponent,UListBoxComponent,CardContentDirective,CardFooterDirective,CardHeaderDirective,CardTitleDirective,CardSubtitleDirective,CardAvatarDirective,URowComponent,UColumnComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  name: string = "";
  constructor(private router: Router) {

}

checkStatus() {}
logout() {
  localStorage.clear();
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}}
