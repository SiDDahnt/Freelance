import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenService } from './token.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: string | null = '';
  showDropdown = false;

  constructor(
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to token changes
    this.tokenService.token$.subscribe((token) => {
      this.token = token;
      this.cdr.detectChanges(); // Manually trigger change detection
    });

    // Close the dropdown on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showDropdown = false; // Close the dropdown
        this.cdr.detectChanges(); // Trigger UI update
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.tokenService.clearToken(); // Clear the token
    this.token = ''; // Clear the local token
    this.cdr.detectChanges(); // Trigger UI update
    this.router.navigate(['']); // Redirect to login page
  }
}
