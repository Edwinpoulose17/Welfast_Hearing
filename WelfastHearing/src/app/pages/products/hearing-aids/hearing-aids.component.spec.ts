import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingAidsComponent } from './hearing-aids.component';

describe('HearingAidsComponent', () => {
  let component: HearingAidsComponent;
  let fixture: ComponentFixture<HearingAidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HearingAidsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HearingAidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
