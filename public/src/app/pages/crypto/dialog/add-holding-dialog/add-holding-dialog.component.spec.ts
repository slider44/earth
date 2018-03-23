import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoldingDialogComponent } from './add-holding-dialog.component';

describe('AddHoldingDialogComponent', () => {
  let component: AddHoldingDialogComponent;
  let fixture: ComponentFixture<AddHoldingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHoldingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHoldingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
