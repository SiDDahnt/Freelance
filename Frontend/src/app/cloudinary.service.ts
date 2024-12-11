import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  cloudName = 'dv3cpyv5m';
  uploadPreset = 'freelance';

  constructor(private http: HttpClient) { }

  uploadImage(imageFile: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post(url, formData);
  }
}
