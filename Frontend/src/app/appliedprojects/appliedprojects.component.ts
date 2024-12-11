import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-appliedprojects',
  templateUrl: './appliedprojects.component.html',
  styleUrls: ['./appliedprojects.component.css']
})
export class AppliedprojectsComponent implements OnInit {

  token: string | null = '';
  user: any = {};
  private apiUrl = 'http://localhost:8000/auth/userDetail';
  private userApiUrl = 'http://localhost:8000/auth/appliedUserByJobId';

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

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

  fetchUser() {
    const headers = new HttpHeaders({
      'x-auth-token': this.token || '', // Set token in x-auth-token header
      'Content-Type': 'application/json'
    });

    this.http.get(this.apiUrl, { headers }).subscribe(
      async (data: any) => {
        this.user = data; // Store fetched user details
        console.log("User details fetched:", this.user);

        // Enrich jobs with client details
        if (Array.isArray(this.user.appliedJobs)) {
          this.user.appliedJobs = await Promise.all(
            this.user.appliedJobs.map(async (job: any) => {
              if (job.userId) {
                const client = await this.fetchClient(job.userId);
                return { ...job, client }; // Add client details to job
              }
              return job;
            })
          );
          console.log("User jobs with client details:", this.user.appliedJobs);
        } else {
          console.error("appliedJobs is not an array:", this.user.appliedJobs);
        }
      },
      (error) => {
        console.error("Failed to fetch User Details:", error); // Log any error
      }
    );
  }

  fetchClient(userId: number) {
    return this.http
      .get(`${this.userApiUrl}/${userId}`)
      .toPromise()
      .then((response: any) => response)
      .catch((error) => {
        console.error(`Failed to fetch client for ID ${userId}:`, error);
        return null; // Fallback in case of an error
      });
  }
}