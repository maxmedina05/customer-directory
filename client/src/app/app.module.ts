import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer/customer-detail/customer-detail.component';
import { CustomerService } from './components/customer/customer.service';

@NgModule({
  declarations: [AppComponent, CustomerListComponent, CustomerDetailComponent],
  imports: [BrowserModule, FormsModule],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
