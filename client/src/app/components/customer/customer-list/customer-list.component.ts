import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Response } from '../../response.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private _currentPage = 1;
  private selectedCustomer: Customer = null;
  customers: Customer[] = [];
  pages = [];
  totalPages = 0;
  CUSTOMER_PER_PAGE = 20;
  modalRef: BsModalRef;

  constructor(
    private customerService: CustomerService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  set currentPage(value: number) {
    this._currentPage = value;
    this.reloadCustomers();
  }

  get currentPage(): number {
    return this._currentPage;
  }

  ngOnInit() {
    this.getCustomers();
  }

  private getCustomers(offset: number = 0) {
    this.customerService
      .getCustomers(offset)
      .subscribe((response: Response) => {
        this.customers = response.payload;

        this.totalPages =
          response.total < this.CUSTOMER_PER_PAGE
            ? 1
            : Math.ceil(response.total / this.CUSTOMER_PER_PAGE);

        this.pages = [];
        for (let i = 0; i < this.totalPages; i++) {
          this.pages.push(i + 1);
        }
      });
  }

  private reloadCustomers() {
    const offset = (this.currentPage - 1) * this.CUSTOMER_PER_PAGE;
    this.getCustomers(offset);
  }

  onAddNewClick() {
    this.router.navigateByUrl('/customers/0');
  }

  onEditClick(customer: Customer) {
    this.router.navigateByUrl('/customers/' + customer.customerID);
  }

  onRemoveClick(customer: Customer) {
    console.log(customer.name.first, 'remove was click');
  }

  onChangePageClick(event, page) {
    event.preventDefault();
    this.currentPage = page;
    const offset = (page - 1) * this.CUSTOMER_PER_PAGE;
    this.getCustomers(offset);
    return false;
  }

  onPreviousClick(event) {
    event.preventDefault();
    if (this.currentPage - 1 === 0) {
      return false;
    }
    this.currentPage--;
    return false;
  }

  onNextClick(event) {
    event.preventDefault();
    if (this.currentPage === this.totalPages) {
      return false;
    }

    this.currentPage++;
    return false;
  }

  onOpenModal(template: TemplateRef<any>, customer: Customer) {
    this.selectedCustomer = customer;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  onConfirmModal() {
    this.customerService
      .deleteCustomer(this.selectedCustomer)
      .subscribe((response: Response) => {
        this.selectedCustomer = null;
        this.reloadCustomers();
      });

    this.modalRef.hide();
  }

  onDeclineModal() {
    this.selectedCustomer = null;
    this.modalRef.hide();
  }
}
