import { Component, Input, Output } from '@angular/core';
import { UButtonComponent } from "../../components/u-button/u-button.component";
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UCardComponent } from '../../components/u-card/u-card.component';
import { UInputComponent } from "../../components/u-input/u-input.component";
import { HttpService } from '../../services/httpservice';
import { UserDto } from '../../models/userDto';
import { RequestMessage } from '../../core/messages/requestMessage';
import { CustomerDto } from '../../models/customerDto';
import { ResponseMessage } from '../../core/messages/responseMessage';
import { UFormSectionComponent } from '../../components/u-form-section/u-form-section.component';
import { USelectComponent } from "../../components/u-select/u-select.component";
import { UListBoxComponent } from '../../components/u-list-box/u-list-box.component';
import { CardContentDirective } from '../../components/u-card/directives/card-content.directive';
import { CardFooterDirective } from '../../components/u-card/directives/card-footer.directive';
import { CardHeaderDirective } from '../../components/u-card/directives/card-header.directive';
import { CardTitleDirective } from '../../components/u-card/directives/card-title.directive';
import { CardSubtitleDirective } from '../../components/u-card/directives/card-subtitle.directive';
import { CardAvatarDirective } from '../../components/u-card/directives/card-avatar.directive';
import { URowComponent } from '../../components/u-row/u-row.component';
import { UColumnComponent } from '../../components/u-column/u-column.component';


@Component({
  selector: 'app-dashboard',
  imports: [UButtonComponent, FormsModule, UCardComponent, UInputComponent, UFormSectionComponent, USelectComponent,UListBoxComponent,CardContentDirective,CardFooterDirective,CardHeaderDirective,CardTitleDirective,CardSubtitleDirective,CardAvatarDirective,URowComponent,UColumnComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {


myFunc($event: Event) {
throw new Error('Method not implemented.');
}

  customer3 = {
    name: 'Ayşe Yılmaz',
    email: 'ayse@example.com',
    age: 29
  };

  data2 = [
    { name: 'İstanbul' },
    { name: 'Ankara' },
    { name: 'İzmir' }
  ];
   // Kart başlığı

  items = ["GfG 1", "GfG 2", "GfG 3", "GfG 4"];
  item ='köpek';
  //@Input({ required: true }) title: string = this.item;
  @Input() title:string=this.item; // Kart resmi

  user={username:'',password:''}; 
  data: any;
  customer: any;
  customer2: any;
  


  constructor(private activated: ActivatedRoute, private router: Router, private svcHttp: HttpService) { }


  method() {
      this.router.navigate(['/login']);
  }
  logout() {
    localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUserList(){
    let dto = new UserDto();
    dto.UserEmail = "osman@mail.";
    dto.UserName = "osman";
    dto.UserPassword = "123456";

    let requestMessage = new RequestMessage();
    requestMessage.Add("Goals.Common.Dtos.UserDto", dto);

    this.svcHttp.post('User/GetCustomer',requestMessage).subscribe((res) => {
      console.log(res);
    });
  }




  getCustomerByCustomerNumber(){
    let dto = new CustomerDto();
    dto.CustomerNumber = '123456789012';

    let requestMessage = new RequestMessage();
    requestMessage.Add("Goals.Common.Dtos.CustomerDto", dto);

    this.svcHttp.post('Customer/GetCustomerByCustomerNumber',requestMessage).subscribe((res : ResponseMessage) => {
      let Data = res.Get<CustomerDto>("Goals.Common.Dtos.CustomerDto");
      console.log('ItemsProxy:', res.ItemsProxy);
      this.customer = res.Get<CustomerDto>("Goals.Common.Dtos.CustomerDto");
      this.data=Data;
      return this.customer;
      console.log('Customer:', this.customer);
    });
  }
}
