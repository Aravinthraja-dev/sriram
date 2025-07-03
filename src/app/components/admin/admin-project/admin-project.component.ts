import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Project } from 'src/app/shared/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css'],
  standalone: true,
  imports: [
    UpperCasePipe,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ]
})
export class AdminProjectComponent implements OnInit {

  displayedColumns: string[] = ['projectTitle', 'projectDescription', 'projectInr', 'projectStatus', 'edit'];
  dataSource = new MatTableDataSource<Project>();
  subscription!: Subscription;

  @ViewChild('sortProject') sortProject!: MatSort;
  @ViewChild('paginatorProject') paginatorProject!: MatPaginator;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.subscription = this.projectService.getAll().pipe(
      tap({
        next: (projects: Project[]) => {
          this.dataSource.data = projects;
          this.dataSource.sort = this.sortProject;
          this.dataSource.paginator = this.paginatorProject;
        },
        error: (err: any) => {
          console.error('Failed to load projects:', err);
        }
      }),
      catchError((err) => {
        console.error('Error in load Projects', err);
        return of([])
      })
    ).subscribe();
  }

  addNewProject() {
    const matRef = this.modalService.open(ProductFormComponent, {
      centered: true,
      size: 'lg',
      backdrop: false,
      keyboard: false
    })
  }

  onFilter(input: string): void {
    this.dataSource.filter = input.trim().toLowerCase();
  }

  editProject(key: string) {
    const matRef = this.modalService.open(ProductFormComponent, {
      centered: true,
      size: 'lg',
      backdrop: false,
      keyboard: false,
    })
    matRef.componentInstance.id = key;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
