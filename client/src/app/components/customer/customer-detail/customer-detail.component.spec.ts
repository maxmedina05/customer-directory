import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
  BsDatepickerModule,
  ModalModule,
  TimepickerModule
} from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { CustomerService } from '../customer-service/customer.service';
import { FakeCustomerService } from '../customer-service/fake-customer-service';
import { LoadingDotComponent } from '../loading-dot/loading-dot.component';
import { CustomerDetailComponent } from './customer-detail.component';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDetailComponent, LoadingDotComponent],
      imports: [
        AngularFontAwesomeModule,
        HttpClientModule,
        FormsModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [{ provide: CustomerService, useClass: FakeCustomerService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Customer Detail', () => {
    expect(component).toBeDefined();
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Add Customer');
  }));

  it('should render a form', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const form = compiled.querySelector('form');
    expect(form).toBeDefined();
  }));

  it('should render a first name input field', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const form = compiled.querySelector('form');
    const input = form.querySelector('input[name="firstName"]');
    expect(input).toBeDefined();
  }));

  it('should render a last name input field', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const form = compiled.querySelector('form');
    const input = form.querySelector('input[name="lastName"]');
    expect(input).toBeDefined();
  }));

  it('should render a birthday input field', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const form = compiled.querySelector('form');
    const input = form.querySelector('input[name="birthday"]');
    expect(input).toBeDefined();
  }));

  it('should render a lastContact input field', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const form = compiled.querySelector('form');
    const input = form.querySelector('input[name="lastContact"]');
    expect(input).toBeDefined();
  }));

  it('should render a customerLifetimeValue input field', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const form = compiled.querySelector('form');
    const input = form.querySelector('input[name="customerLifetimeValue"]');
    expect(input).toBeDefined();
  }));

  it('should render a submit button', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).toBeDefined();
  }));

  it('should render a delete button', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('#delete-button');
    expect(button).toBeDefined();
  }));
});
