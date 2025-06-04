import { Component } from '@angular/core';
import { COMMON_COMPONENTS } from '../../shared/common-components';
import { HttpService } from '../../services/httpservice';
import { RequestMessage } from '../../core/messages/requestMessage';
import { UserDto } from '../../models/userDto';
import { CustomerDto } from '../../models/customerDto';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [COMMON_COMPONENTS],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  getFirstItem<T = any>(proxy: any): T | null {
    if (!proxy || typeof proxy !== 'object') return null;
    const key = Object.keys(proxy)[0];
    return proxy[key] ?? null;
}

  public customerData: CustomerDto = new CustomerDto();
  public customerResData: CustomerDto = new CustomerDto();
  
  constructor(private svcHttp: HttpService,private toastr: ToastrService, private cd: ChangeDetectorRef) { }
    
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
  getcustomer= () =>{
    let requestMessage = new RequestMessage();
    
    requestMessage.Add("Goals.Common.Dtos.CustomerDto", this.customerData);

     this.svcHttp.post("Customer/GetCustomerByCustomerNumber",requestMessage).subscribe((res) => {
      console.log(res);
    }); 
  }

  createCustomer = () => {
    let requestMessage = new RequestMessage();

    let dto = new CustomerDto();

    requestMessage.Add("Goals.Common.Dtos.CustomerDto", this.customerData);
    
    this.svcHttp.post("Customer/CreateCustomer",requestMessage).subscribe((res) => {});
  
  }


    resetCustomerData() {
      this.customerData = new CustomerDto();
      this.cd.detectChanges();
  }

/**
 * 
 * 
  customerData = {
    CustomerNumber: '',
    Status: '',
    TCNumber: '',
    CustomerName: '',
    CustomerSurname: '',
    CustomerMotherName: '',
    CustomerFatherName: '',
    CustomerBirthDate: '',
    CustomerGender: '',
    MaritalStatus: '',
    RecordDate: '',
    RecordUser: '',
    RecordScreenCode: '',
    CustomerType: '',
}
 */
}
