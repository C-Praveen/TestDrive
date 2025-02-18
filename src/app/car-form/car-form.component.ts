import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  standalone:false,
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  carForm!: FormGroup;
  testTypes = ['Emission test', 'Inspection check', 'Safety check'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      carName: ['', Validators.required],
      testType: ['', Validators.required],
      testDate: ['', Validators.required],
      testTime: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      console.log('Form submitted:', this.carForm.value);
      // Add your API call or service method here to save the data
    } else {
      this.markFormGroupTouched(this.carForm);
    }
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
