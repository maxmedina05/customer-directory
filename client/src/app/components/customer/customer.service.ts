import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from './customer.model';
import { Response } from '../response.model';

const BASE_API_ENDPOINT = '/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(offset: number = 0): Observable<Response> {
    return this.http.get<Response>(
      `${BASE_API_ENDPOINT}//customers?skip=${offset}`
    );
  }
}
