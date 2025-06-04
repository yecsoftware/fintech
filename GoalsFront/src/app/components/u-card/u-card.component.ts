import { ChangeDetectionStrategy, Component,ContentChild, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderDirective } from '../../components/u-card/directives/card-header.directive';
import { CardContentDirective } from '../../components/u-card/directives/card-content.directive';
import { CardFooterDirective } from '../../components/u-card/directives/card-footer.directive';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CardTitleDirective } from './directives/card-title.directive';
import { CardSubtitleDirective } from './directives/card-subtitle.directive';
import { CardAvatarDirective } from './directives/card-avatar.directive';
import { UButtonComponent } from '../u-button/u-button.component';



@Component({
  selector: 'u-card',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatCardModule, MatButtonModule ,CardContentDirective, CardHeaderDirective, CardFooterDirective,CardTitleDirective,CardSubtitleDirective,CardAvatarDirective,UButtonComponent],

  templateUrl: './u-card.component.html',
  styleUrls: ['./u-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UCardComponent {
  item ='köpek';
  
  @Input( ) title: string = this.item; // Kart başlığ
  @Input() subtitle: string = ''; // Kart alt başlığı
  @Input() image: string = ''; // Kart resmi
  @Input() data: any; // Dışarıdan gönderilen obje


  @ContentChild(CardHeaderDirective) cardHeader?: CardHeaderDirective;
  @ContentChild(CardTitleDirective) cardTitle?: CardTitleDirective;
  @ContentChild(CardAvatarDirective) cardAvatar?: CardAvatarDirective;
  @ContentChild(CardSubtitleDirective) cardSubtitle?: CardSubtitleDirective;
  @ContentChild(CardContentDirective) cardContent?: CardContentDirective;
  @ContentChild(CardFooterDirective) cardFooter?: CardFooterDirective;





  isOpen: boolean = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}


