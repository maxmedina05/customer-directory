import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDotComponent } from './loading-dot.component';

describe('LoadingDotComponent', () => {
  let component: LoadingDotComponent;
  let fixture: ComponentFixture<LoadingDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingDotComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the loading dot', () => {
    expect(component).toBeTruthy();
  });
});
