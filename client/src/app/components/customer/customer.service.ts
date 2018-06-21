import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Response } from '../response.model';
import { Customer } from './customer.model';
import { ToastrService } from 'ngx-toastr';

const BASE_API_ENDPOINT = '/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getCustomers(offset: number = 0): Observable<Response> {
    return this.http
      .get<Response>(`${BASE_API_ENDPOINT}/customers?skip=${offset}`)
      .pipe(catchError(this.handleError('getCustomers')));
  }

  getCustomer(customerID: number): Observable<Response> {
    return this.http
      .get<Response>(`${BASE_API_ENDPOINT}/customers/${customerID}`)
      .pipe(catchError(this.handleError('getCustomer')));
  }

  updateCustomer(customer: Customer): Observable<Response> {
    return this.http
      .put<Response>(
        `${BASE_API_ENDPOINT}/customers/${customer.customerID}`,
        customer
      )
      .pipe(
        tap(() =>
          this.showToastMessage(
            'Success',
            'Oh Yeah. You were successful!',
            'success'
          )
        ),
        catchError(this.handleError('updateCustomer'))
      );
  }

  addCustomer(customer: Customer): Observable<Response> {
    return this.http
      .post<Response>(`${BASE_API_ENDPOINT}/customers`, customer)
      .pipe(
        tap(() =>
          this.showToastMessage(
            'Success',
            'Oh Yeah. You were successful!',
            'success'
          )
        ),
        catchError(this.handleError('addCustomer'))
      );
  }

  deleteCustomer(customer: Customer): Observable<Response> {
    return this.http
      .delete<Response>(`${BASE_API_ENDPOINT}/customers/${customer.customerID}`)
      .pipe(
        tap(() =>
          this.showToastMessage(
            'Success',
            'Oh Yeah. You were successful!',
            'success'
          )
        ),
        catchError(this.handleError('deleteCustomer'))
      );
  }

  private handleError(operation = 'operation') {
    return (error: any): Observable<Response> => {
      const content = error.error;
      console.error(content);

      this.showToastMessage('Error', 'Oh no, something went wrong.', 'error');

      const result = {
        payload: null,
        error: {
          name: content.name,
          message: content.message
        }
      };
      return of(result as Response);
    };
  }

  private showToastMessage(title, message, type) {
    switch (type) {
      case 'success':
        this.toastr.success(message, title);
        break;
      case 'error':
        this.toastr.error(message, title);
    }
  }
}
