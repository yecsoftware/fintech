import { Component ,Output,Input,EventEmitter} from '@angular/core';
import { UInputComponent } from '../../components/u-input/u-input.component'; // yolu kendi dosya yapına göre düzelt
import { UColumnComponent } from '../../components/u-column/u-column.component'; // varsa bu da gerekli
import { URowComponent } from '../../components/u-row/u-row.component'; // varsa bu da gerekli
import { FormsModule } from '@angular/forms'; // iki yönlü bağlama için gerekli
import { COMMON_COMPONENTS } from '../../shared/common-components';
import { ExpansionPanelContentDirective } from '../../components/u-expansion-panel/directives/expansion-panel-content.directive';
import { ExpansionPanelFooterDirective } from '../../components/u-expansion-panel/directives/expansion-panel-footer.directive';
import { ExpansionPanelHeaderDirective } from '../../components/u-expansion-panel/directives/expansion-panel-header.directive';
import { HttpService } from '../../services/httpservice';
import { RequestMessage } from '../../core/messages/requestMessage';
import { UserDto } from '../../models/userDto';
import { CustomerDto } from '../../models/customerDto';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  imports: [
    COMMON_COMPONENTS,
    UInputComponent,
    UColumnComponent,
    URowComponent,
    ExpansionPanelContentDirective,
    ExpansionPanelHeaderDirective,
    ExpansionPanelFooterDirective,
    
  ]
})
export class TransactionComponent {
    getFirstItem<T = any>(proxy: any): T | null {
    if (!proxy || typeof proxy !== 'object') return null;
    const key = Object.keys(proxy)[0];
    return proxy[key] ?? null;
}

    public customerData: CustomerDto = new CustomerDto();
    constructor(private svcHttp: HttpService,private toastr: ToastrService) { }

  post = () =>{

    let requestMessage = new RequestMessage();

    let dto = new CustomerDto();
  
    dto.TCNumber = this.customerData.TCNumber;
    

    requestMessage.Add("Goals.Common.Dtos.CustomerDto", dto);


    this.svcHttp.post("Customer/DeleteCustomer",requestMessage).subscribe((res) => {
      const result = this.getFirstItem(res.ItemsProxy);
      if (result?.ResultCode === 'NOT_FOUND') {
        this.toastr.warning(result.ResultMessage);
      }
      if (result?.ResultCode === "SUCCESS") {
        this.toastr.success(result.ResultMessage);}
      else (result?.ResultCode === "ERROR");
    });
}


}
