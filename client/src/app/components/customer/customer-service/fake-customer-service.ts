import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer, CustomerJSON } from '../customer.model';
import { CUSTOMERS } from './customers.mock';
import { ICustomerService } from './customer.service';
import { Response } from '../../response.model';

@Injectable({
  providedIn: 'root'
})
export class FakeCustomerService implements ICustomerService {
  getCustomers(offset: number, limit: number): Observable<Response> {
    const response = {
      payload: CUSTOMERS
    };

    return of(response);
  }
  getCustomer(customerID: number): Observable<Response> {
    const customer = CUSTOMERS.find(c => c.customerID === customerID);
    const response = {
      payload: customer
    };
    return of(response);
  }
  updateCustomer(customer: Customer): Observable<Response> {
    throw new Error('Method not implemented.');
  }
  addCustomer(customer: Customer): Observable<Response> {
    throw new Error('Method not implemented.');
  }
  deleteCustomer(customer: Customer): Observable<Response> {
    throw new Error('Method not implemented.');
  }
}
