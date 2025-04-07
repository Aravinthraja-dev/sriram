import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Project } from 'src/app/shared/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ProjectsComponent implements OnInit {
  projectBanner = "assets/project.jpg";
  project: Project[] = [];
  filteredProject: Project[] = [];
  projectStatus: any;
  isSorted: boolean = false;
  searchControl = new FormControl();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(projects => {
      this.project = projects
      this.filteredProject = [...this.project]
    })

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filteredProject = this.project.filter(project => project.projectTitle.toLowerCase().includes(value.toLowerCase()));
    })
  }



  sortProject() {
    if (!this.project.length) {
      this.project = [...this.project];
    }

    if (this.isSorted) {
      this.filteredProject = [...this.project];

    } else {
      this.filteredProject = [...this.project].sort((a: any, b: any) =>
        a.projectTitle.localeCompare(b.projectTitle)
      );
    }

    this.isSorted = !this.isSorted;
 }

  onSelectChange(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    const selectedValue = selectedElement.value;

    switch (selectedValue) {
      case 'all':
        this.filteredProject = this.project;
        break;
      case 'ongoing':
        this.filteredProject = this.project.filter(project => {
          console.log('Project ', project)
          return project.projectStatus === selectedValue
        });
        break;
      case 'completed':
        this.filteredProject = this.project.filter(project => project.projectStatus === selectedValue)
        break;
    }
  }
}
