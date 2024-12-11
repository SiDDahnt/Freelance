import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import emailjs from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentJobs: any[] = []; // Property to store recent jobs
  @ViewChild('recentJobsContainer', { static: true }) recentJobsContainer!: ElementRef; // Reference to the container

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.addBlobAnimation();
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    const contactMessage = document.getElementById('contact-message') as HTMLElement;
    const container = document.querySelector('.card1') as HTMLElement;

    // Fetch recent jobs directly
    this.fetchRecentJobs();

    const sendEmail = (e: Event) => {
      e.preventDefault();
      emailjs.sendForm('service_1fazjfk', 'template_42j3zx5', '#contact-form', '_z8Qe2R_S9RbCd_X0')
        .then(() => {
          contactMessage.textContent = 'Message sent successfully';
          setTimeout(() => {
            contactMessage.textContent = '';
          }, 5000);
          contactForm.reset();
        })
        .catch(() => {
          contactMessage.textContent = 'Message not sent (Service Error)';
        });
    };

    contactForm.addEventListener('submit', sendEmail);

    // Smooth horizontal scrolling with mouse wheel
    container.addEventListener('wheel', (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        const scrollAmount = event.deltaY;
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: 'smooth'
        });
      }
    });

    this.recentJobsContainer.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        const scrollAmount = event.deltaY;
        this.recentJobsContainer.nativeElement.scrollTo({
          left: this.recentJobsContainer.nativeElement.scrollLeft + scrollAmount,
          behavior: 'smooth'
        });
      }
    });
  }

  fetchRecentJobs() {
    this.http.get<any[]>('http://localhost:8000/job/getRecentJobs')
      .subscribe(
        (jobs) => {
          this.recentJobs = jobs;
          console.log('Recent jobs fetched:', this.recentJobs); // Log jobs for verification
        },
        (error) => {
          console.error('Error fetching recent jobs:', error);
        }
      );
  }

  addBlobAnimation() {
    const cards = document.querySelectorAll(".card");
    window.addEventListener("mousemove", (ev) => {
      cards.forEach((card) => {
        const blob = (card as HTMLElement).querySelector(".blob") as HTMLElement;
        const fakeBlob = (card as HTMLElement).querySelector(".fakeblob") as HTMLElement;
        if (blob && fakeBlob) {
          const rect = fakeBlob.getBoundingClientRect();
  
          // Calculate the center of the blob relative to the cursor
          const blobWidth = blob.offsetWidth / 2;
          const blobHeight = blob.offsetHeight / 2;
  
          const x = ev.clientX - rect.left - blobWidth;
          const y = ev.clientY - rect.top - blobHeight;
  
          blob.animate(
            [
              {
                transform: `translate(${x}px, ${y}px)`
              }
            ],
            {
              duration: 3000, /* Smooth, fast animation */
              fill: "forwards",
              easing: "ease-out" /* Smooth easing */
            }
          );
        }
      });
    });
  }
}