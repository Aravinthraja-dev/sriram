import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-mainproject',
  templateUrl: './mainproject.component.html',
  styleUrls: ['./mainproject.component.css']
})
export class MainprojectComponent implements OnInit{
  projects: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(project => {
      this.projects = project.slice(0,3);
    })
  }


}
