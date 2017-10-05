import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { QRCodeModule } from 'angularx-qrcode';

import { NgMaterialModule } from './components/ng-material.module';
import { CommonComponentModule } from './common/common.module';

import { LandingComponent } from './landing/landing.component';
import { CreateComponent } from './create/create.component';
import { TrackComponent } from './track/track.component';
import { AppComponent } from './app.component';

import { routes } from './app.routes';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    LandingComponent,
    TrackComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDNNG9-hBHrbY1nkklO_87tBvgSs7XygF8'}),
    BrowserAnimationsModule,
    BrowserModule,
    CommonComponentModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgMaterialModule,
    QRCodeModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
