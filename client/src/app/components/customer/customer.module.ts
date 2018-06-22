import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
  BsDatepickerModule,
  ModalModule,
  TimepickerModule
} from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerService } from './customer.service';

import { LoadingDotComponent } from './loading-dot/loading-dot.component';

import { CustomerRoutingModule } from './customer-routing-module';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CustomerRoutingModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent,
    LoadingDotComponent
  ],
  providers: [CustomerService]
})
export class CustomerModule {}
