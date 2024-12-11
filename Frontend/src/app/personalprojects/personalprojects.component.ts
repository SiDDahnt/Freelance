import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';
import { color } from '@cloudinary/url-gen/qualifiers/background';

declare var Razorpay: any;

@Component({
  selector: 'app-personalprojects',
  templateUrl: './personalprojects.component.html',
  styleUrls: ['./personalprojects.component.css']
})
export class PersonalprojectsComponent implements OnInit{
  token: string | null = '';
  jobs: any[] = []; // Array to store fetched job
  
  private jobsApiUrl = 'http://localhost:8000/job/getJobs';
  private userApiUrl = 'http://localhost:8000/auth/appliedUserByJobId';

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tokenService.token$.subscribe((token) => {
      this.token = token;
      console.log('Token assigned:', this.token);
      this.cdr.detectChanges();

      if (this.token) {
        this.fetchJobs();
      }
    });
  }

  fetchJobs() {
    const headers = new HttpHeaders({
      'x-auth-token': this.token || '', // Set token in x-auth-token header
      'Content-Type': 'application/json'
    });

    this.http.get(this.jobsApiUrl, { headers }).subscribe(
      async (data: any) => {
        this.jobs = await Promise.all(
          data.map(async (job: any) => {
            if (job.appliedUserId) {
              const developer = await this.fetchDeveloper(job.appliedUserId);
              return { ...job, developer };
            }
            return job;
          })
        );
        console.log('User jobs:', this.jobs);
      },
      (error) => {
        console.error('Failed to fetch jobs:', error);
      }
    );
  }

  fetchDeveloper(appliedUserId: number) {
    return this.http
      .get(`${this.userApiUrl}/${appliedUserId}`)
      .toPromise()
      .then((response: any) => response)
      .catch((error) => {
        console.error(`Failed to fetch developer for ID ${appliedUserId}:`, error);
        return null; // Fallback in case of an error
      });
  }
  


  completeJob(jobId: number) {
    if (!this.token) {
      console.error("Token is not available!");
      return;
    }
  
    const headers = new HttpHeaders({
      'x-auth-token': this.token, // Use x-auth-token header for authentication
      'Content-Type': 'application/json'
    });
  
    const body = { jobId }; // Payload to be sent to the backend
  
    this.http.patch('http://localhost:8000/job/completeJob', body, { headers }).subscribe(
      (response: any) => {
        console.log("Job marked as completed successfully:", response);
        // Optionally, update the UI to reflect the completed job
        this.jobs = this.jobs.map(job =>
          job.id === jobId ? { ...job, status: "COMPLETED" } : job
        );
        alert("Job marked as completed successfully!");
      },
      (error) => {
        console.error("Failed to mark job as completed:", error);
        if (error.status === 403) {
          alert("You are not authorized to complete this job.");
        } else if (error.status === 404) {
          alert("Job not found.");
        } else {
          alert("An error occurred while completing the job. Please try again.");
        }
      }
    );
  }
  

  loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  payNow() {
    this.loadRazorpayScript().then(() => {
      const RazorpayOptions = {
        description: 'Sample RAZORPAY Demo',
        currency: 'INR',
        amount: 3000,
        name: 'Sid',
        key: 'rzp_test_TJK9knVbPptRC6',
        prefill: {
          name: 'Sid Saha',
          email: 'sid@gmail.com',
          phone: 9910850257,
        },
        theme: {
          color: '#f37254',
        },
        modal: {
          ondismiss: () => console.log('Dismissed'),
        },
      };
  
      const rzp = new Razorpay(RazorpayOptions);
      rzp.open();
    }).catch(() => {
      console.error('Failed to load Razorpay script');
    });
  }


  
}
