import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap
} from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

import { Customer, CustomerJSON } from '../customer.model';
import { CustomerService } from '../customer-service/customer.service';
import { Response } from '../../response.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  CUSTOMER_PER_PAGE = 10;
  private searchTerms = new Subject<string>();
  private _currentPage = 1;
  private _selectedCustomer: Customer = null;
  isLoading = false;
  customers$: Observable<Customer[]>;
  totalCustomers = 0;
  pages = [];
  totalPages = 0;
  query = '';
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
    this.customers$ = this.searchTerms.pipe(
      debounceTime(300),
      // distinctUntilChanged(),
      switchMap((nextSearchQuery: string) => {
        this.isLoading = true;
        const searchQuery = JSON.parse(nextSearchQuery);
        const { offset, term } = searchQuery;
        return this.customerService.searchCustomers(term, offset);
      }),
      map(x => this.handleSearchResponse(x))
    );

    // initialize search
    setTimeout(() => {
      this.onSearch('');
    }, 300);
  }

  ngOnDestroy() {
    this.onDeclineModal();
  }

  private handleSearchResponse(response) {
    const body = response.payload as CustomerJSON[];
    const customers = body.map(c => Customer.buildCustomerFromJSON(c));
    this.computeNumberOfPages(response);
    this.isLoading = false;
    return customers;
  }

  private computeNumberOfPages(response) {
    this.totalCustomers = response.total;
    this.totalPages =
      response.total < this.CUSTOMER_PER_PAGE
        ? 1
        : Math.ceil(response.total / this.CUSTOMER_PER_PAGE);

    this.pages = [];
    for (let i = 0; i < this.totalPages; i++) {
      this.pages.push(i + 1);
    }
  }

  private reloadCustomers() {
    console.log('reloadCustomers');
    const offset = (this.currentPage - 1) * this.CUSTOMER_PER_PAGE;
    const searchQuery = JSON.stringify({
      offset: offset,
      term: this.query
    });
    this.searchTerms.next(searchQuery);
  }

  onSearch(term: string) {
    const searchQuery = JSON.stringify({
      offset: 0,
      term
    });

    this.searchTerms.next(searchQuery);
  }

  onAddNewClick() {
    this.router.navigateByUrl('/customers/0');
  }

  onEditClick(customer: Customer) {
    this.router.navigateByUrl('/customers/' + customer.customerID);
  }

  onChangePageClick(event, page) {
    event.preventDefault();
    this.currentPage = page;
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
    this._selectedCustomer = customer;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  onConfirmModal() {
    this.customerService
      .deleteCustomer(this._selectedCustomer)
      .subscribe((response: Response) => {
        this._selectedCustomer = null;
        this.reloadCustomers();
      });

    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  onDeclineModal() {
    this._selectedCustomer = null;
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
