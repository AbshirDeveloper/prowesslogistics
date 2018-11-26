import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFeesComponent } from './bank-fees.component';

describe('BankFeesComponent', () => {
  let component: BankFeesComponent;
  let fixture: ComponentFixture<BankFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
