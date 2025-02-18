import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { PassedCarsComponent } from './passed-cars/passed-cars.component';
import { FailedCarsComponent } from './failed-cars/failed-cars.component';
import { CarFormComponent } from './car-form/car-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'passed-cars', component: PassedCarsComponent },
  { path: 'failed-cars', component: FailedCarsComponent },
  { path: 'car-form', component:CarFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }