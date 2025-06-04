import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExampleService } from '../../services/example.service';
import { SearchPipe } from '../service-ornek-1/search.pipe';
import { NamePipe } from '../service-ornek-1/name.pipe';

@Component({
  selector: 'app-service-ornek-2',
  imports: [FormsModule,SearchPipe],
  templateUrl: './service-ornek-2.component.html',
  styleUrl: './service-ornek-2.component.scss'
})
export class ServiceOrnek2Component {
  search: string = '';
  example=inject(ExampleService);
  constructor(
    public service: ExampleService
  ) { }

  // bu iki kod aynı işlevi yerine getirir     
  // 
  // constructor içerisinde verilebilir ya da inject ile inject edilir.


}
