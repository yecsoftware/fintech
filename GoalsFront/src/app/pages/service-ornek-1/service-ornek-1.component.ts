import { Component } from '@angular/core';
import { ServiceOrnek2Component } from '../service-ornek-2/service-ornek-2.component';
import { FormsModule } from '@angular/forms';
import { ExampleService } from '../../services/example.service';
import { SearchPipe } from './search.pipe';
import { NamePipe } from './name.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-ornek-1',
  imports: [ServiceOrnek2Component,FormsModule,NamePipe,CommonModule],
  templateUrl: './service-ornek-1.component.html',
  styleUrl: './service-ornek-1.component.scss'
})
export class ServiceOrnek1Component {
  constructor(
    public service: ExampleService
  ) { }


}
