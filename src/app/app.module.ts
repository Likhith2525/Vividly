import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { WomendetailsComponent } from './womendetails/womendetails.component';
import { MendetailsComponent } from './mendetails/mendetails.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenComponent,
    WomenComponent,
    WomendetailsComponent,
    MendetailsComponent,
    ContactusComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
