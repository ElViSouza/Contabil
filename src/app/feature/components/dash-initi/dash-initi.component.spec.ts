/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashInitiComponent } from './dash-initi.component';

describe('DashInitiComponent', () => {
  let component: DashInitiComponent;
  let fixture: ComponentFixture<DashInitiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashInitiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashInitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
