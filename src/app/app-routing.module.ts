import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { MenComponent } from './men/men.component';
import { MendetailsComponent } from './mendetails/mendetails.component';
import { WomenComponent } from './women/women.component';
import { WomendetailsComponent } from './womendetails/womendetails.component';

const routes: Routes = [
  {path:'men',component:MenComponent},
  {path:'men/:id',component:MendetailsComponent},
  {path:'women',component:WomenComponent},
  {path:'women/:id',component:WomendetailsComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'home',component:HomeComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
