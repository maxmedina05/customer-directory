import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CUSTOMERS } from './customers.mock';

const BASE_API_ENDPOINT = '/api/v1';

interface Response {
  payload: any[] | any;
  count: number;
  total: number;
  error: any;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get(BASE_API_ENDPOINT + '/customers')
      .pipe(map((res: Response) => (res.payload as Customer[]) || []));
  }
}
