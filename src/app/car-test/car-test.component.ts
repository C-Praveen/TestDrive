import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-test',
  standalone: false,
  templateUrl: './car-test.component.html',
  styleUrls: ['./car-test.component.css']
})
export class CarTestComponent implements OnInit {
  carTestForm: FormGroup;
  
  // Test categories with their respective sub-categories
  testCategories = [
    {
      name: 'Safety Check',
      items: [
        'Braking System', 
        'Headlights and Signals', 
        'Mirrors and Windows',
        'Seat Belts',
        'Horn',
        'Tires and Wheels'
      ]
    },
    {
      name: 'Emission Test',
      items: [
        'Carbon Monoxide (CO) Levels',
        'Hydrocarbon (HC) Levels',
        'Nitrogen Oxide (NOx) Levels',
        'Particulate Matter',
        'Exhaust System Integrity'
      ]
    },
    {
      name: 'Inspection Check',
      items: [
        'Engine Condition',
        'Transmission',
        'Steering System',
        'Suspension System',
        'Fuel System',
        'Battery and Electrical System',
        'Fluid Levels',
        'Vehicle Identification Number (VIN)'
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.carTestForm = this.fb.group({}); // Initialize with empty group to prevent undefined errors
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    // Create the parent form group
    const formGroupConfig: { [key: string]: FormArray } = {};
    
    // For each test category, create a FormArray of FormGroups for each item
    this.testCategories.forEach(category => {
      formGroupConfig[this.formatCategoryName(category.name)] = this.fb.array(
        category.items.map(item => this.createItemFormGroup(item))
      );
    });
    
    // Create the main form with formGroupConfig
    this.carTestForm = this.fb.group(formGroupConfig);
  }

  createItemFormGroup(itemName: string) {
    return this.fb.group({
      itemName: [itemName],
      result: ['', Validators.required],
      comments: ['']
    });
  }

  // Helper method to get the form controls for a specific category
  getFormArray(categoryName: string): FormArray {
    const formArray = this.carTestForm.get(this.formatCategoryName(categoryName));
    if (!formArray) {
      throw new Error(`Form control for ${categoryName} not found`);
    }
    return formArray as FormArray;
  }

  // Format category name to be valid as a form control name (no spaces, lowercase)
  formatCategoryName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '');
  }

  onSubmit() {
    if (this.carTestForm.valid) {
      console.log('Form submitted:', this.carTestForm.value);
      
      // Create a more readable formatted result
      const formattedResult: { [key: string]: Array<{item: string, result: string, comments: string}> } = {};
      
      this.testCategories.forEach(category => {
        const categoryName = this.formatCategoryName(category.name);
        const categoryControl = this.carTestForm.get(categoryName);
        
        if (categoryControl) {
          const categoryResults = categoryControl.value;
          
          formattedResult[category.name] = categoryResults.map((item: {itemName: string, result: string, comments: string}) => ({
            item: item.itemName,
            result: item.result,
            comments: item.comments
          }));
        }
      });
      
      console.log('Formatted result:', formattedResult);
      // Add your API or service call here
    } else {
      this.markFormGroupTouched(this.carTestForm);
      alert('Please complete all required fields before submitting.');
    }
  }

  // Helper to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(c => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          } else {
            c.markAsTouched();
          }
        });
      }
    });
  }

  // Helper to determine if a form control has a specific error
  hasError(categoryName: string, itemIndex: number, errorName: string): boolean {
    try {
      const formArray = this.getFormArray(categoryName);
      const control = (formArray.at(itemIndex) as FormGroup).get('result');
      return control ? control.hasError(errorName) && control.touched : false;
    } catch (error) {
      console.error(`Error checking for ${errorName} at ${categoryName}[${itemIndex}]:`, error);
      return false;
    }
  }
}