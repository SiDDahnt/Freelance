import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
=======
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));
>>>>>>> c55374c3a30e105f7d9ba334cbfe78330ddda465

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
  it(`should have the 'Frontend' title`, () => {
=======
  it(`should have as title 'Frontend'`, () => {
>>>>>>> c55374c3a30e105f7d9ba334cbfe78330ddda465
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
<<<<<<< HEAD
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Frontend');
=======
    expect(compiled.querySelector('.content span')?.textContent).toContain('Frontend app is running!');
>>>>>>> c55374c3a30e105f7d9ba334cbfe78330ddda465
  });
});
