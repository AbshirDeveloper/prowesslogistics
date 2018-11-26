import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeBacksComponent } from './charge-backs.component';

describe('ChargeBacksComponent', () => {
  let component: ChargeBacksComponent;
  let fixture: ComponentFixture<ChargeBacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeBacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeBacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
