import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UCardComponent } from '../../components/u-card/u-card.component';

@Component({
  selector: 'app-ngcontent',
  imports: [ CommonModule,RouterOutlet,UCardComponent],
  template:`<router-outlet></router-outlet>`,
  templateUrl: './ngcontent.component.html',
  styleUrl: './ngcontent.component.scss'
})
export class NgcontentComponent {

  name: string = 'EMRE';
  count = 5;
  title = 'kurumsal-ui-ornek';

}
