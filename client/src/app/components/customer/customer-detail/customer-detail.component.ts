import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Response } from '../../response.model';
import * as moment from 'moment';

const defaultCustomer = {
  customerID: 0,
  name: {
    first: '',
    last: ''
  },
  birthday: new Date(),
  gender: 'm',
  lastContact: new Date(),
  customerLifetimeValue: 0
};

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer = defaultCustomer;
  title = 'Add Customer';
  isEditMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    const customerID = +this.route.snapshot.paramMap.get('customerID');
    this.isEditMode = customerID !== 0 ? true : false;
    this.title = this.isEditMode ? 'Edit Customer' : 'Add Customer';
    this.getCustomer(customerID);
  }

  getCustomer(customerID: number) {
    if (customerID === 0) {
      return;
    }

    this.customerService
      .getCustomer(customerID)
      .subscribe((response: Response) => {
        this.customer = response.payload;
      });
  }

  onBack() {
    this.router.navigateByUrl('/customers');
  }

  onSubmit() {
    const birthday: string = moment(this.customer.birthday).format(
      'YYYY-MM-DD'
    );
    this.customer.birthday = birthday;

    if (this.isEditMode) {
      this.customerService
        .updateCustomer(this.customer)
        .subscribe((response: Response) => {
          if (response.payload) {
            this.router.navigateByUrl('/customers');
          }
        });

      return;
    }

    this.customerService
      .addCustomer(this.customer)
      .subscribe((response: Response) => {
        if (response.payload) {
          this.router.navigateByUrl('/customers');
        }
      });
  }

  onDelete() {
    console.log('onDelete');
  }

  onReset() {
    this.router.navigateByUrl('/customers/0');
    this.customer = defaultCustomer;
  }

  isGenderSelected(gender) {
    return this.customer.gender === gender;
  }

  onSelectGender(gender) {
    this.customer.gender = gender;
  }
}
