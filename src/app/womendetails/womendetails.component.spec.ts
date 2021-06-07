import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomendetailsComponent } from './womendetails.component';

describe('WomendetailsComponent', () => {
  let component: WomendetailsComponent;
  let fixture: ComponentFixture<WomendetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomendetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WomendetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
