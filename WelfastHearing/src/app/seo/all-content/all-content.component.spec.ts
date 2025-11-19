import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContentComponent } from './all-content.component';

describe('AllContentComponent', () => {
  let component: AllContentComponent;
  let fixture: ComponentFixture<AllContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
