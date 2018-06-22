import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { CustomerService } from '../customer-service/customer.service';
import { FakeCustomerService } from '../customer-service/fake-customer-service';
import { LoadingDotComponent } from '../loading-dot/loading-dot.component';
import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent, LoadingDotComponent],
      imports: [
        AngularFontAwesomeModule,
        HttpClientModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [{ provide: CustomerService, useClass: FakeCustomerService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Customer List', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Customer List');
  }));

  it('should render a table', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    expect(table).toBeDefined();
  }));

  it('should render five customer in table', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');

    expect(table.rows.length - 1).toBe(5);
  }));

  it('should render a add customer button', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('#add-customer-button');
    expect(button).toBeDefined();
  }));
});
