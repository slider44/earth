import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHoldingDialogComponent } from './view-holding-dialog.component';

describe('ViewHoldingDialogComponent', () => {
  let component: ViewHoldingDialogComponent;
  let fixture: ComponentFixture<ViewHoldingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHoldingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHoldingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
