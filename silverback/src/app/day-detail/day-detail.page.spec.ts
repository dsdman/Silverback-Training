import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDetailPage } from './day-detail.page';

describe('DayDetailPage', () => {
  let component: DayDetailPage;
  let fixture: ComponentFixture<DayDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
