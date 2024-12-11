import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  // Method to set the token after login
  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
    console.log("Token set in TokenService:", token);
  }

  // Method to get the token, possibly for initial load
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Call this in ngOnInit in the component to set the token if available
  loadToken() {
    const token = this.getToken();
    if (token) {
      this.tokenSubject.next(token);
      console.log("Token loaded from localStorage:", token);
    } else {
      console.error("Token not found in localStorage!");
    }
  }

  // Method to clear the token
  clearToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    console.log("Token cleared from TokenService");
  }
}
