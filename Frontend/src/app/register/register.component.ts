import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  isPopupActive: boolean = false;
  otp: string = ''; // To store OTP input
  otpError: string = ''; // To display OTP verification errors
  isOtpSent: boolean = false; // To track if OTP is sent successfully
  @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5') otpInputs!: QueryList<ElementRef>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {} // Inject MatSnackBar

  ngOnInit(): void {}

  save() {
    this.register();
  }

  // Method to handle user registration
  register() {
    const name = `${this.firstName} ${this.lastName}`.trim(); // Concatenate first and last name

    const bodyData = {
      name: name,
      email: this.email,
      phone: this.phone,
      password: this.password,
    };

    // Register the user
    this.http.post('http://localhost:8000/auth/signup', bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.snackBar.open('User Registered Successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        // Once the user is registered, send the OTP to the email
        this.sendOtp();
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Error during registration. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  // Method to send OTP to the email
  sendOtp() {
    this.http.post('http://localhost:8000/otp/getOtp', { email: this.email }).subscribe(
      (response: any) => {
        console.log('OTP sent:', response);
        this.isOtpSent = true; // OTP sent successfully
        this.showPopup(); // Show the OTP popup
        this.snackBar.open('OTP sent successfully to your email.', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Error sending OTP. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  // Show OTP popup
  showPopup() {
    this.isPopupActive = true;
  }

  // Verify the OTP entered by the user
  verifyOtp() {
    let otpValue = ''; // Collect OTP from all input fields
    this.otpInputs.forEach((input, index) => {
      otpValue += input.nativeElement.value;
    });

    if (otpValue.length !== 6) {
      this.otpError = 'Please enter the full 6-digit OTP.';
      return;
    }

    this.http.post('http://localhost:8000/otp/verifyOtp', { email: this.email, otp: otpValue }).subscribe(
      (response: any) => {
        console.log('OTP Verified:', response);
        this.snackBar.open('OTP Verified and Account Verified Successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.isPopupActive = false; // Close the OTP popup
      },
      (error) => {
        console.error(error);
        this.otpError = 'Invalid OTP or OTP expired. Please try again.';
        this.snackBar.open('Invalid OTP or OTP expired. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
    this.router.navigateByUrl('/auth/login');
  }

  // Move to the next OTP input
  moveToNext(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value.length === 1 && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    } else if (value.length === 0 && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }
}
