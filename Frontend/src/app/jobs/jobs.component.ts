import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  categoryName: any;
  projectDetails: any = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient){}


  ngOnInit(): void {
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
    if (this.categoryName) {
      this.fetchCategoryJobs(this.categoryName);
    }
  }
  
  fetchCategoryJobs(category: string): void {
    // Verify that the category is being passed correctly
    console.log("Category sent to backend:", category);
  
    this.http.get(`http://localhost:8000/job/getCategoryJobs/${category}`).subscribe(
      (data: any) => {
        this.projectDetails = data;
      },
      error => {
        console.error("Error fetching category jobs:", error);
      }
    );
  }
  
}

