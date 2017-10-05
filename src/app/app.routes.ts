import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { TrackComponent } from './track/track.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'track', component: TrackComponent},
  {path: 'create', component: CreateComponent},
  {path: '**', component: LandingComponent}
];