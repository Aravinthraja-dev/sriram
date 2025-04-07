import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/shared/model/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, take } from 'rxjs';
import { ContactServiceService } from 'src/app/shared/services/contact-service.service';
import { ContactForm } from 'src/app/shared/model/contact-form';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { catchError, of, tap } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css'],
  standalone: true,
  imports: [
    UpperCasePipe, RouterLink,
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    MultiSelectModule,
    SelectButtonModule,
    CurrencyPipe,
    
  ]
})
export class AdminProjectComponent implements OnInit{

  displayedColumns: string[] = ['projectTitle', 'projectDescription', 'projectInr', 'projectStatus', 'edit'];
  displayedMessageColums: string[] = ['sno','username', 'email', 'message', 'action'];
  dataSource = new MatTableDataSource<Project>();
  messageSource = new MatTableDataSource<ContactForm>();
  subscription!: Subscription;
  projects: Project[] = [];
  loading: boolean = true;

  selectedRepresentatives: string[] = [];

  filterProject: Project[] = [];

  selectedStatus: string[] = [];

  representatives!: string[];

  status!: string[];

  @ViewChild('sortProject') sortProject!: MatSort;
  @ViewChild('paginatorProject') paginatorProject!: MatPaginator;
  @ViewChild('sortMessage') sortMessage!: MatSort;
  @ViewChild('paginatorMessage') paginatorMessage!: MatPaginator;

  constructor(
    private projectService: ProjectService,
    private contactService: ContactServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadMessages();
    console.log("Lazy Loading");
  }

  loadProjects(): void {
    this.subscription = this.projectService.getAll().pipe(
      tap({
        next: (projects: Project[]) => {
          this.projects = projects
          this.filterProject = projects;
          this.loading = false
          this.representatives = this.projects.map(item => item.projectTitle)
          this.status = [...new Set(this.projects.map(item => item.projectStatus))];
          this.dataSource.data = projects;
          this.dataSource.sort = this.sortProject;
          this.dataSource.paginator = this.paginatorProject;
        },
        error: (err) => {
          console.error('Failed to load projects:', err);
        }
      }),
      catchError((err) => {
        console.error('Error in load Projects', err);
        return of([])
      })
    ).subscribe();
  }

  loadMessages(): void {
    this.subscription = this.contactService.getUsers().subscribe((messages: ContactForm[]) => {
      this.messageSource.data = messages;
      this.messageSource.sort = this.sortMessage;
      this.messageSource.paginator = this.paginatorMessage;
    });
  }

  applyGlobalFilter(event: Event, dt2: any) {
    const inputElement = event.target as HTMLInputElement;
    if (dt2) {
      dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  addNewProject() {
    this.router.navigate(['/admin/dashboard/new'])
  }

  getSerialNumber(index: number): number {
    return index + 1 + this.paginatorMessage.pageIndex * this.paginatorMessage.pageSize;
  }
  onFilter(input: string): void {
    this.dataSource.filter = input.trim().toLowerCase();
  }

  filterCallback(selectedProduct: string[]) {
    if(selectedProduct.length === 0) {
      this.filterProject = this.projects;
    } else {
      this.filterProject = this.projects.filter(
        project => selectedProduct.includes(project.projectTitle) || selectedProduct.includes(project.projectStatus))
    }
  }

  filterRepresentatives(event: any): void {
    if (event.value === undefined || event.value.length === 0) {
        this.selectedRepresentatives = [];
        this.filterCallback([]);
    } else {
        this.selectedRepresentatives = event.value;
        this.filterCallback(this.selectedRepresentatives);
    }
  }

  filterStatus(event: any): void {
    this.selectedStatus = event.value;
    this.filterCallback(this.selectedStatus)
  }

  editProject(key: string) {
    this.router.navigate(['/admin/dashboard/', key]);
  }

  confirm(event: Event,key: string) {

  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteMessage(messageId: string){
    if(!confirm("Are you want to delete this project")) return;
    this.contactService.deleteUser(messageId).then(() => {
      // Refresh the data after deletion
      this.loadMessages();
    });
  }
}
