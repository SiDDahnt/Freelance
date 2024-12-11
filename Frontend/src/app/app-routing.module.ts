import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectpostComponent } from './projectpost/projectpost.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalprojectsComponent } from './personalprojects/personalprojects.component';
import { ProjectpageComponent } from './projectpage/projectpage.component';
import { AppliedprojectsComponent } from './appliedprojects/appliedprojects.component';
import { BlogComponent } from './blog/blog.component';
import { Blogpg1Component } from './blogpg1/blogpg1.component';
import { Blogpg2Component } from './blogpg2/blogpg2.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'auth/login', component:LoginComponent},
  {path: 'auth/signup', component:RegisterComponent},
  {path: 'projectpost', component:ProjectpostComponent},
  {path: 'projects/:category', component:JobsComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'personalprojects', component:PersonalprojectsComponent},
  {path: 'projectpage/:id', component:ProjectpageComponent},
  {path: 'appliedprojects', component:AppliedprojectsComponent},
  {path: 'blog', component:BlogComponent},
  {path: 'blog1', component:Blogpg1Component},
  {path: 'blog2', component:Blogpg2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
