import { Component } from '@angular/core';
import { CUSTOMERS } from './components/customers.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webtrekk Customer Directory';
  customers = CUSTOMERS;
}
