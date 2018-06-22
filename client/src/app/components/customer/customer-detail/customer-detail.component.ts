import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Location } from '@angular/common';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Response } from '../../response.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  isLoading = false;
  customer: Customer = new Customer();
  title = 'Add Customer';
  isEditMode = false;
  modalRef: BsModalRef;
  lastContactTime: Date = new Date();
  maxDateAllowed: Date = new Date();
  customerForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customerForm = new FormGroup({});

    const customerID = +this.route.snapshot.paramMap.get('customerID');
    this.isEditMode = customerID !== 0 ? true : false;
    this.title = this.isEditMode ? 'Edit Customer' : 'Add Customer';
    this.getCustomer(customerID);
  }

  ngOnDestroy() {
    this.onDeclineModal();
  }

  getCustomer(customerID: number) {
    if (customerID === 0) {
      return;
    }
    this.isLoading = true;

    this.customerService
      .getCustomer(customerID)
      .subscribe((response: Response) => {
        this.customer = Customer.buildCustomerFromJSON(response.payload);
        this.lastContactTime = new Date(this.customer.lastContact);
        this.isLoading = false;
      });
  }

  goBack() {
    this.router.navigateByUrl('/customers');
  }

  onSubmit(event) {
    event.preventDefault();
    this.isLoading = true;

    this.customer.lastContact.setHours(this.lastContactTime.getHours());
    this.customer.lastContact.setMinutes(this.lastContactTime.getMinutes());
    this.customer.lastContact.setSeconds(this.lastContactTime.getSeconds());

    if (this.isEditMode) {
      this.customerService
        .updateCustomer(this.customer)
        .subscribe((response: Response) => this.onSubmitFinished(response));
    } else {
      this.customerService
        .addCustomer(this.customer)
        .subscribe((response: Response) => this.onSubmitFinished(response));
    }
  }

  onSubmitFinished(response: Response) {
    this.isLoading = false;
    if (response.payload) {
      this.customer = new Customer();
      this.router.navigateByUrl('/customers');
    }
  }

  onReset(event) {
    event.preventDefault();
    const { customerID } = this.customer;
    this.customer = new Customer();
    this.customer.customerID = customerID;
    return false;
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
