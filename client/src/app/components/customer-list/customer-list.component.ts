import { Component, Input } from '@angular/core';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];

  onEditClick(customer: Customer): void {
    console.log(customer.name.first, 'edit was click');
  }

  onRemoveClick(customer: Customer): void {
    console.log(customer.name.first, 'remove was click');
  }
}
