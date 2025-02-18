import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-form',
  standalone:false,
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  vehicleForm!: FormGroup;
  engineTypes: string[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  maxDate = new Date(); // To prevent future dates

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.vehicleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      engineType: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      photo: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.vehicleForm.get('photo')?.setValue('');
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      // Create FormData object for sending to the backend (if needed)
      const formData = new FormData();
      
      // Append form values
      Object.keys(this.vehicleForm.value).forEach(key => {
        if (key !== 'photo') {
          formData.append(key, this.vehicleForm.value[key]);
        }
      });
      
      // Append the file if selected
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }
      
      console.log('Form submitted:', this.vehicleForm.value);
      console.log('FormData object:', formData);
      
      // Here you would call your service to save the data
      // this.vehicleService.saveVehicle(formData).subscribe(...);
      
      this.snackBar.open('Vehicle saved successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    } else {
      this.markFormGroupTouched(this.vehicleForm);
      this.snackBar.open('Please fix the errors in the form', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
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

  getErrorMessage(controlName: string): string {
    const control = this.vehicleForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.getError('minlength').requiredLength} characters`;
    }
    if (control?.hasError('maxlength')) {
      return `Maximum length is ${control.getError('maxlength').requiredLength} characters`;
    }
    return '';
  }

  // Convenient getters
  get nameControl() { return this.vehicleForm.get('name'); }
  get dateControl() { return this.vehicleForm.get('date'); }
  get modelControl() { return this.vehicleForm.get('model'); }
  get colorControl() { return this.vehicleForm.get('color'); }
  get engineTypeControl() { return this.vehicleForm.get('engineType'); }
  get descriptionControl() { return this.vehicleForm.get('description'); }
}