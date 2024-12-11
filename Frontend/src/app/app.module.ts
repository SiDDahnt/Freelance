import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectpostComponent } from './projectpost/projectpost.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalprojectsComponent } from './personalprojects/personalprojects.component';
import { ProjectpageComponent } from './projectpage/projectpage.component';
import { AppliedprojectsComponent } from './appliedprojects/appliedprojects.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogComponent } from './blog/blog.component';
import { Blogpg1Component } from './blogpg1/blogpg1.component';
import { Blogpg2Component } from './blogpg2/blogpg2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProjectpostComponent,
    JobsComponent,
    ProfileComponent,
    PersonalprojectsComponent,
    ProjectpageComponent,
    AppliedprojectsComponent,
    BlogComponent,
    Blogpg1Component,
    Blogpg2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
