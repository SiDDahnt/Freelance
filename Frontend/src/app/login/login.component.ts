import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) { }

  save() {
    this.login();
  }

  login() {
    const bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:8000/auth/login', bodyData, { observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          // Check the status code
          if (response.status === 200) {
            this.snackBar.open('Login Success', 'Close', {
              duration: 3000, // 3 seconds
              panelClass: ['success-snackbar'], // Optional: custom class for styling
              horizontalPosition: 'right', // Position on the right
              verticalPosition: 'top' // Position at the top // Optional: custom class for styling
            });
            this.tokenService.setToken(response.body.token); // Set the token in TokenService
            this.router.navigateByUrl('');
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.snackBar.open('Incorrect Email or Password', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              horizontalPosition: 'right', // Position on the right
              verticalPosition: 'top' // Position at the top // Optional: custom class for styling
            });
          } else if (error.status === 500) {
            this.snackBar.open('Internal Server Error', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          } else {
            this.snackBar.open(`Unexpected error: ${error.status}`, 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              horizontalPosition: 'right', // Position on the right
              verticalPosition: 'top' // Position at the top
            });
          }
        }
      });
  }
}
