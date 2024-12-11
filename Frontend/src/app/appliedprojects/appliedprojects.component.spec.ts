import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedprojectsComponent } from './appliedprojects.component';

describe('AppliedprojectsComponent', () => {
  let component: AppliedprojectsComponent;
  let fixture: ComponentFixture<AppliedprojectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedprojectsComponent]
    });
    fixture = TestBed.createComponent(AppliedprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
