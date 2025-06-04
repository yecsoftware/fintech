import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HttpService } from './services/httpservice';
import{MatCardModule} from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import { AppSpinnerComponent } from './components/app-spinner/app-spinner.component';
import { LoaderService } from './services/loader.service';
import { inject } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink,RouterModule,MatCardModule,LoginComponent,AppSpinnerComponent, AsyncPipe, NgIf],
  providers: [HttpService],
  template: `<router-outlet></router-outlet>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  loader = inject(LoaderService);

  title = 'kurumsal-ui-ornek';
}