import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
  birthday: '',
  gender: '',
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
  birthday = new Date();
  title = 'Add Customer';
  isEditMode = false;
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService,
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

        this.birthday = new Date(this.customer.birthday);
        this.customer.lastContact = new Date(this.customer.lastContact);
      });
  }

  goBack() {
    this.router.navigateByUrl('/customers');
  }

  onSubmit(event) {
    event.preventDefault();
    const birthday: string = moment(this.birthday).format('YYYY-MM-DD');
    this.customer.birthday = birthday;

    if (this.isEditMode) {
      this.customerService
        .updateCustomer(this.customer)
        .subscribe((response: Response) => {
          if (response.payload) {
            this.customer = defaultCustomer;
            this.router.navigateByUrl('/customers');
          }
        });

      return;
    }

    this.customerService
      .addCustomer(this.customer)
      .subscribe((response: Response) => {
        if (response.payload) {
          this.customer = defaultCustomer;
          this.router.navigateByUrl('/customers');
        }
      });
  }

  onReset() {
    this.customer = defaultCustomer;
    this.birthday = new Date();
    this.router.navigateByUrl('/customers/0');
  }

  isGenderSelected(gender) {
    return this.customer.gender === gender;
  }

  onSelectGender(gender) {
    this.customer.gender = gender;
  }

  onOpenModal(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    return false;
  }

  onConfirmModal() {
    this.customerService
      .deleteCustomer(this.customer)
      .subscribe((response: Response) => {
        this.goBack();
      });

    this.modalRef.hide();
  }

  onDeclineModal() {
    this.modalRef.hide();
  }
}
