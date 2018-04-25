import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoinTransactionComponent } from './view-coin-transaction.component';

describe('ViewCoinTransactionComponent', () => {
  let component: ViewCoinTransactionComponent;
  let fixture: ComponentFixture<ViewCoinTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoinTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoinTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
