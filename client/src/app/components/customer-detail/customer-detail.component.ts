import { Component, Input } from '@angular/core';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent {
  customer: Customer = {
    customerID: 1,
    name: {
      first: 'Peter',
      last: 'Smith'
    },
    birthday: '1996-10-12',
    gender: 'm',
    lastContact: new Date('2017-06-01T23:28:56.782Z'),
    customerLifetimeValue: 191.12
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

  onCancel(): void {
    console.log('onCancel');
  }
}
