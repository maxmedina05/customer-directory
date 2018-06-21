import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
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

  constructor(private location: Location) {}

  onBack() {
    this.location.back();
  }

  onSubmit() {
    console.log('onSubmit');
  }

  onDelete() {
    console.log('onDelete');
  }

  onReset() {
    console.log('onReset');
  }
}
