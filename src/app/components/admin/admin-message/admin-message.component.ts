import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContactForm } from 'src/app/shared/model/contact-form';
import { ContactServiceService } from 'src/app/shared/services/contact-service.service';


@Component({
  selector: 'app-admin-message',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './admin-message.component.html',
  styleUrl: './admin-message.component.css'
})
export class AdminMessageComponent implements OnInit{
  @ViewChild('sortMessage') sortMessage!: MatSort;
  @ViewChild('paginatorMessage') paginatorMessage!: MatPaginator;

  displayedMessageColums: string[] = ['sno','username', 'email', 'message', 'action'];
  messageSource = new MatTableDataSource<ContactForm>();
  subscription!: Subscription;

  constructor(private contactService: ContactServiceService) { }

  ngOnInit(): void {
    this.loadMessages();
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

  deleteMessage(messageId: string){
    if(!confirm("Are you want to delete this project")) return;
    this.contactService.deleteUser(messageId).then(() => {
      this.loadMessages();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
