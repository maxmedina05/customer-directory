import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getCustomers();
  }

  private getCustomers() {
    this.customerService
      .getCustomers()
      .subscribe(customers => (this.customers = customers));
  }

  onEditClick(customer: Customer) {
    console.log(customer.name.first, 'edit was click');
  }

  onRemoveClick(customer: Customer) {
    console.log(customer.name.first, 'remove was click');
  }
}
