import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../cloudinary.service';
import { TokenService } from '../token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectpost',
  templateUrl: './projectpost.component.html',
  styleUrls: ['./projectpost.component.css']
})
export class ProjectpostComponent implements OnInit {
  title: string = '';
  company: string = '';
  category: string = '';
  skill: string = '';
  skills: string[] = [];
  description: string = '';
  deadline: string = '';
  salary: string = '';
  imageUrl: string = ''; 
  isUploading: boolean = false; 
  token: string | null = '';  // Store token from TokenService

  constructor(
    private cloudinaryService: CloudinaryService, 
    private tokenService: TokenService, 
    private cdr: ChangeDetectorRef,
    private http: HttpClient,  // Inject HttpClient
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the token from TokenService
    this.tokenService.token$.subscribe((token) => {
      this.token = token;
      console.log("Token assigned:", this.token);  // Verify token assignment
      this.cdr.detectChanges();  // Manually trigger change detection
    });
  }

  addSkill() {
    if (this.skill.trim()) {
      this.skills.push(this.skill.trim());
      this.skill = ''; // Clear the input after adding
    }
  }

  removeSkill(skillToRemove: string) {
    this.skills = this.skills.filter(skill => skill !== skillToRemove);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploading = true; // Start loading
      this.cloudinaryService.uploadImage(file).subscribe(
        (response) => {
          this.imageUrl = response.secure_url; // Store the uploaded image URL
          this.isUploading = false; // Stop loading
        },
        (error) => {
          console.error('Image upload failed:', error);
          this.isUploading = false; // Stop loading on error
        }
      );
    }
  }

  add() {
    return {
      "title": this.title,
      "company": this.company,
      "imageUrl": this.imageUrl,
      "category": this.category,
      "skills": this.skills,
      "description": this.description,
      "deadline": this.deadline,
      "salary": this.salary
    }; 
  }

  save() {
    if (!this.token) {
      console.error('Token is not available!');
      return;
    }

    const bodyData = this.add();

    // Check for required fields
    if (!bodyData.title || !bodyData.company || !bodyData.category || !bodyData.skills.length || !bodyData.description || !bodyData.deadline || !bodyData.salary) {
      console.error('All fields are required!');
      return;
    }

    console.log("Data being sent:", bodyData); // Log body data for verification

    const headers = new HttpHeaders({
      'x-auth-token': this.token, // Use x-auth-token header instead of Authorization
      'Content-Type': 'application/json'
    });

    console.log("Headers:", headers); // Log headers to verify

    this.http.post('http://localhost:8000/job/postJob', bodyData, { headers })
      .subscribe(
        (response) => {
          console.log('Job posted successfully:', response);

          // Show success message
          this.snackBar.open('Job posted successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });

          // Redirect to home page
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error posting job:', error);
          if (error.status === 401) {
            console.error('Unauthorized: Check the token or authentication requirements.');
          } else if (error.status === 400) {
            console.error('Bad Request: Ensure all fields are correct.');
          }
        }
      );
  }
}
