import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MendetailsComponent } from './mendetails.component';

describe('MendetailsComponent', () => {
  let component: MendetailsComponent;
  let fixture: ComponentFixture<MendetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MendetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MendetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
