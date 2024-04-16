import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent {

  projects$:any;

  constructor(private projectService: ProjectService) { 
    this.projects$ =  this.projectService.getAll()
  }
}
