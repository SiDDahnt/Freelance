import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectpostComponent } from './projectpost.component';

describe('ProjectpostComponent', () => {
  let component: ProjectpostComponent;
  let fixture: ComponentFixture<ProjectpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectpostComponent]
    });
    fixture = TestBed.createComponent(ProjectpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
