import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projectBanner = "assets/project.jpg";
  project: Project[] = [];
  filteredProject: Project[] = [];
  projectStatus: any;
   
  constructor(projectService: ProjectService,route: ActivatedRoute,) { 
    projectService
    .getAll()
    .pipe(switchMap(projects => {
      this.project = projects;
      return route.queryParamMap;
    }))
      .subscribe(params => {
        this.projectStatus = params.get('projectStatus');
  
        this.filteredProject = (this.projectStatus) ?
          this.project.filter((p:any) => p.projectStatus === this.projectStatus) : 
          this.project;
      })
  }
}
