import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blogpg2Component } from './blogpg2.component';

describe('Blogpg2Component', () => {
  let component: Blogpg2Component;
  let fixture: ComponentFixture<Blogpg2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Blogpg2Component]
    });
    fixture = TestBed.createComponent(Blogpg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
