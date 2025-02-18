import { Component, OnInit } from '@angular/core';

interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  imageUrl: string;
  passedDate: Date;
  testScore: number;
}

@Component({
  selector: 'app-passed-cars',
  standalone:false,
  templateUrl: './passed-cars.component.html',
  styleUrls: ['./passed-cars.component.css']
})
export class PassedCarsComponent implements OnInit {
  passedCars: Car[] = [];

  constructor() { }

  ngOnInit(): void {
    // Simulate getting data from a service
    this.passedCars = [
      {
        id: 1,
        name: 'Toyota Camry',
        model: 'LE',
        year: 2020,
        imageUrl: 'Images/magnite.jpg',
        passedDate: new Date(2024, 1, 15),
        testScore: 92
      },
      {
        id: 2,
        name: 'Honda Accord',
        model: 'Sport',
        year: 2021,
        imageUrl: 'Images/kwid.jpg',
        passedDate: new Date(2024, 1, 12),
        testScore: 95
      },
      {
        id: 3,
        name: 'Ford Mustang',
        model: 'GT',
        year: 2019,
        imageUrl: 'Images/kicks.jpg',
        passedDate: new Date(2024, 1, 10),
        testScore: 88
      }
    ];
  }

  viewReport(carId: number): void {
    console.log(`View report for car with ID: ${carId}`);
    // Here you would typically navigate to the report page or open a modal
    // this.router.navigate(['/car-report', carId]);
  }
}