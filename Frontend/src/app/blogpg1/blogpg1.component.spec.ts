import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blogpg1Component } from './blogpg1.component';

describe('Blogpg1Component', () => {
  let component: Blogpg1Component;
  let fixture: ComponentFixture<Blogpg1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Blogpg1Component]
    });
    fixture = TestBed.createComponent(Blogpg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
