import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projectpage',
  templateUrl: './projectpage.component.html',
  styleUrls: ['./projectpage.component.css']
})
export class ProjectpageComponent implements OnInit {
  id: string | null = null; // Type as string to match the query parameter
  token: string | null = null; // Store the token value
  jobDetails: any = null; // To store job details

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to the token service and store the token
    this.tokenService.token$.subscribe((token) => {
      this.token = token;
      console.log("Token assigned:", this.token); // Debugging log
      this.cdr.detectChanges(); // Manually trigger change detection
    });

    // Get the job ID from the route
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchJobDetails(this.id); // Call the function to fetch job details
    }
  }

  fetchJobDetails(id: string) {
    this.http
      .get(`http://localhost:8000/job/jobDetail?id=${id}`) // Ensure the URL matches the backend route
      .subscribe({
        next: (response) => {
          console.log("Job details fetched successfully:", response);
          this.jobDetails = response; // Store the fetched job details
        },
        error: (error) => {
          console.error("Error fetching job details:", error); // Log error
        },
      });
  }


  applyForJob() {
    if (!this.token) {
      console.error("No token found. Please log in first.");
      return;
    }
  
    if (!this.id) {
      console.error("No job ID found.");
      return;
    }
  
    const requestBody = {
      jobId: this.id,
    };
  
    this.http
      .patch('http://localhost:8000/job/applyJob', requestBody, {
        headers: {
          'x-auth-token': this.token, // Include the token in the headers
        },
      })
      .subscribe({
        next: (response) => {
          console.log("Job application successful:", response);
          alert("You have successfully applied for the job!");
          // Refresh job details after application
        },
        error: (error) => {
          console.error("Error applying for the job:", error);
          if (error.status === 400) {
            alert("Job already applied by another user.");
          } else {
            alert("An error occurred while applying for the job. Please try again.");
          }
        },
      });
  }

  getStatusMessage(status: string): string {
    switch (status) {
      case 'APPLIED':
        return 'Not Accepting!';
      case 'COMPLETED':
        return 'Project Completed!';
      default:
        return 'Job is not open for applications.';
    }
  }
  
}
