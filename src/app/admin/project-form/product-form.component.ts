import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/services/project.service';
import { StatusService } from 'src/services/status.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

  status$;

  projectForm : FormGroup;

  constructor(statusService: StatusService, private projectService: ProjectService) { 
    this.status$ = statusService.getStatus();

    this.projectForm = new FormGroup({
      projectTitle: new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(50)]),
      projectId: new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
      projectInr: new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$'), Validators.min(0)]),
      imageUrl: new FormControl("",[Validators.required]),
      projectStatus: new FormControl("",[Validators.required]),
      projectDescription: new FormControl("",[Validators.required, Validators.maxLength(100)])
    })
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;

      this.projectService.saveData(formData)
        .then(() => {
          console.log('Form data saved successfully!');
          this.projectForm.reset();
        })
        .catch(error => {
          console.error('Error saving form data:', error);
        });
    } else {
      this.markFormGroupTouched(this.projectForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}


