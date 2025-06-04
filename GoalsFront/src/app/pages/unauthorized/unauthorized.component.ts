import { Component } from '@angular/core';
import { COMMON_COMPONENTS } from '../../shared/common-components';

@Component({
  selector: 'app-unauthorized',
  imports: [COMMON_COMPONENTS],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
  goHome() {
    location.href = './layout/home';
  }

}
