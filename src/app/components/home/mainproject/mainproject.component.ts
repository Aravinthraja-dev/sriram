import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/shared/services/project.service';
import { NgFor, UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-mainproject',
    templateUrl: './mainproject.component.html',
    styleUrls: ['./mainproject.component.css'],
    standalone: true,
    imports: [NgFor, UpperCasePipe]
})
export class MainprojectComponent implements OnInit{
  projects: any[] = [];

  constructor(private projectService: ProjectService, private router:Router) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(project => {
      this.projects = project.slice(0,3);
    })
  }

  gotoProjects(){
    this.router.navigate(["/projects"]);
  }
}
