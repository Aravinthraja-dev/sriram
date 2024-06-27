import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, take } from 'rxjs';
import { ContactServiceService } from 'src/app/services/contact-service.service';
import { ContactForm } from 'src/app/model/contact-form';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit{

  displayedColumns: string[] = ['projectTitle', 'projectDescription', 'projectInr', 'projectStatus', 'edit'];
  displayedMessageColums: string[] = ['sno','username', 'email', 'message', 'action'];
  dataSource = new MatTableDataSource<Project>();
  messageSource = new MatTableDataSource<ContactForm>();
  subscription!: Subscription;

  @ViewChild('sortProject') sortProject!: MatSort;
  @ViewChild('paginatorProject') paginatorProject!: MatPaginator;
  @ViewChild('sortMessage') sortMessage!: MatSort;
  @ViewChild('paginatorMessage') paginatorMessage!: MatPaginator;

  constructor(
    private projectService: ProjectService,
    private contactService: ContactServiceService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadMessages();
    console.log("Lazy Loading");
  }

  loadProjects(): void {
    this.subscription = this.projectService.getAll().subscribe((projects: Project[]) => {
      this.dataSource.data = projects;
      this.dataSource.sort = this.sortProject;
      this.dataSource.paginator = this.paginatorProject;
    });
  }

  loadMessages(): void {
    this.subscription = this.contactService.getUsers().subscribe((messages: ContactForm[]) => {
      this.messageSource.data = messages;
      this.messageSource.sort = this.sortMessage;
      this.messageSource.paginator = this.paginatorMessage;
    });
  }

  getSerialNumber(index: number): number {
    return index + 1 + this.paginatorMessage.pageIndex * this.paginatorMessage.pageSize;
  }
  onFilter(input: string): void {
    this.dataSource.filter = input.trim().toLowerCase();
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
