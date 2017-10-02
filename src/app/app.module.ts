import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgMaterialModule } from './components/ng-material.module';
import { LandingComponent } from './landing/landing.component';

import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule,
    // TODO: Add components module
    // ComponentsModule,
    NgMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
