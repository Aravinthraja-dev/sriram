import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
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
export class AdminMessageComponent implements OnInit {
  @ViewChild('sortMessage') sortMessage!: MatSort;
  @ViewChild('paginatorMessage') paginatorMessage!: MatPaginator;

  displayedMessageColums: string[] = ['sno', 'username', 'email', 'message', 'action'];
  messageSource = new MatTableDataSource<ContactForm>();
  subscription!: Subscription;

  constructor(
    private contactService: ContactServiceService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

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

  async deleteMessage(messageId: string) {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.title = 'Confirm Delete';
    modalRef.componentInstance.message = 'Are you sure you want to delete this Message?';

    modalRef.closed.subscribe(async (result) => {
      if (result === 'confirm') {
        try {
          await this.contactService.deleteUser(messageId);
          this.snackBar.open('Message deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['admin/admin-message']);
        } catch (error) {
          this.snackBar.open('Failed to delete project', 'Close', { duration: 3000 });
          console.error('Delete error:', error);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
