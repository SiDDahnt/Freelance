import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: string | null = '';
  user: any = {};
  private apiUrl = 'http://localhost:8000/auth/userDetail';

  ngOnInit() {
    this.tokenService.token$.subscribe((token) => {
      this.token = token;
      console.log("Token assigned:", this.token); // Verify token assignment
      this.cdr.detectChanges(); // Manually trigger change detection

      if (this.token) {
        this.fetchUser();
      }
    });
  }

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  fetchUser() {
    const headers = new HttpHeaders({
      'x-auth-token': this.token || '',  // Set token in x-auth-token header
      'Content-Type': 'application/json'
    });

    this.http.get(this.apiUrl, { headers }).subscribe(
      (data: any) => {
        this.user = data; // Store fetched jobs
        console.log("User jobs:", this.user); // Log jobs for verification
      },
      (error) => {
        console.error("Failed to fetch User Details:", error); // Log any error
      }
    );
  }
}
