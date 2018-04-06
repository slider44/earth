import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent1Component } from './user1.component';

describe('UserComponent1Component', () => {
  let component: UserComponent1Component;
  let fixture: ComponentFixture<UserComponent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
