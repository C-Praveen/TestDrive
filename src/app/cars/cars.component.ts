import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Car {
  id: number;
  model: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-cars',
  standalone: false,
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];

  constructor(private readonly route:Router) { }

  ngOnInit(): void {
    // Mock data - in a real app, this would come from a service
    this.cars = [
      {
        id: 1,
        brand: 'Tesla',
        model: 'Model S',
        year: 2023,
        price: 89990,
        imageUrl: 'Images/kiger.jpg',
        description: 'Electric luxury sedan with impressive performance and range.'
      },
      {
        id: 2,
        brand: 'BMW',
        model: '5 Series',
        year: 2023,
        price: 54900,
        imageUrl: 'Images/triber.jpg',
        description: 'Executive sedan combining luxury, performance and advanced technology.'
      },
      {
        id: 3,
        brand: 'Audi',
        model: 'A6',
        year: 2023,
        price: 55900,
        imageUrl: 'Images/kwid.jpg',
        description: 'Premium sedan with elegant design and sophisticated features.'
      },
      {
        id: 1,
        brand: 'Tesla',
        model: 'Model S',
        year: 2023,
        price: 89990,
        imageUrl: 'Images/magnite.jpg',
        description: 'Electric luxury sedan with impressive performance and range.'
      },
      {
        id: 2,
        brand: 'BMW',
        model: '5 Series',
        year: 2023,
        price: 54900,
        imageUrl: 'Images/kicks.jpg',
        description: 'Executive sedan combining luxury, performance and advanced technology.'
      },
      {
        id: 3,
        brand: 'Audi',
        model: 'A6',
        year: 2023,
        price: 55900,
        imageUrl: 'Images/duster1.jpg',
        description: 'Premium sedan with elegant design and sophisticated features.'
      }
    ];
  }

  handleEdit(car: Car): void {
    console.log('Edit car:', car);
    // Implement edit logic or open edit dialog
  }

  handleDelete(car: Car): void {
    console.log('Delete car:', car);
    // Implement delete logic with confirmation
    if (confirm(`Are you sure you want to delete ${car.brand} ${car.model}?`)) {
      this.cars = this.cars.filter(c => c.id !== car.id);
    }
  }

  handleTestDrive(car: Car): void {
    // console.log('Test drive request for:', car);
    // Implement test drive scheduling logic
    // alert(`Test drive request submitted for ${car.brand} ${car.model}`);
    this.route.navigate(['car-form']);
  }

  addcar(){
    this.route.navigate(['vehicle-form']);
  }
}
