import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/model/project';
import { ProjectService } from 'src/services/project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit{

  displayedColumns: string[] = ['projectTitle', 'projectDescription', 'projectInr','projectStatus','edit'];
  dataSource = new MatTableDataSource<Project>();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private projectService: ProjectService) { }
  ngOnInit(): void {
    this.subscription = this.projectService.getAll()
    .subscribe((projects: any) => {
        this.dataSource = new MatTableDataSource<Project>(projects);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  
  onFilter(input: string) {
    this.dataSource.filter = input.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
