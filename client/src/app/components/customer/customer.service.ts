import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { CUSTOMERS } from './customers.mock';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomers(): Observable<Customer[]> {
    return of(CUSTOMERS);
  }
}
