import { Component, Input } from '@angular/core';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent {
  customer: Customer = {
    customerID: 0,
    name: {
      first: '',
      last: ''
    },
    birthday: new Date().toDateString(),
    gender: 'm',
    lastContact: new Date(),
    customerLifetimeValue: 0
  };

  onBack(): void {
    console.log('onBack');
  }

  onSubmit(): void {
    console.log('onSubmit');
  }

  onDelete(): void {
    console.log('onDelete');
  }

  onReset(): void {
    console.log('onReset');
  }
}
