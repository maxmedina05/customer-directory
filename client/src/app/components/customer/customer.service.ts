import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Response } from '../response.model';
import { Customer } from './customer.model';

const BASE_API_ENDPOINT = '/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(offset: number = 0): Observable<Response> {
    return this.http.get<Response>(
      `${BASE_API_ENDPOINT}/customers?skip=${offset}`
    );
  }

  getCustomer(customerID: number): Observable<Response> {
    return this.http.get<Response>(
      `${BASE_API_ENDPOINT}/customers/${customerID}`
    );
  }

  updateCustomer(customer: Customer): Observable<Response> {
    return this.http.put<Response>(
      `${BASE_API_ENDPOINT}/customers/${customer.customerID}`,
      customer
    );
  }

  addCustomer(customer: Customer): Observable<Response> {
    return this.http.post<Response>(`${BASE_API_ENDPOINT}/customers`, customer);
  }

  deleteCustomer(customer: Customer): Observable<Response> {
    return this.http.delete<Response>(
      `${BASE_API_ENDPOINT}/customers/${customer.customerID}`
    );
  }
}
