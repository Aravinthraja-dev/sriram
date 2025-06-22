import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, Subscription, take } from 'rxjs';
import { Status } from 'src/app/shared/model/status';
import { ProjectService } from 'src/app/shared/services/project.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { FileInputComponent } from '../file-input/file-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [FormsModule, AsyncPipe, FileInputComponent, MatButtonModule, MatSnackBarModule]
})
export class ProductFormComponent implements OnInit, OnDestroy {

  status$!: Observable<Status[]>;
  project: any = {};
  id!: string | null;
  previewImage: string | ArrayBuffer | null = null;
  currentImageUrl: string | null = null;
  selectedFile: File | null = null;
  uploadPercentge: number = 0;
  selectedFileName: string | null = null;
  isEditMode!: boolean;
  private dialogSub?: Subscription;


  constructor(
    private statusService: StatusService,
    private projectService: ProjectService,
    private route: Router,
    private router: ActivatedRoute,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {

    this.id = this.router.snapshot.paramMap.get('id');
    if (this.id) {
      this.projectService.get(this.id).pipe(take(1)).subscribe((p: any) => {
        this.project = p;
        this.previewImage = p.imageUrl;
        this.currentImageUrl = p.imageUrl;
        this.selectedFileName = this.getFileNameFromUrl(p.imageUrl);
        this.isEditMode = true;
      });
    }

  }
  ngOnInit(): void {
    this.status$ = this.statusService.getStatus();
  }

  saveProject(project: any) {
    if (this.id) {
      this.projectService.update(this.id, project).then(() => {
        this.snackBar.open('Project Updated successfully', 'Close', { duration: 3000 });
      }).catch(() => {
        this.snackBar.open('Failed to Update project', 'Close', { duration: 3000 });
      });
    }
    else {
      this.projectService.create(project).then(() => {
        this.snackBar.open('Project Added successfully', 'Close', { duration: 3000 });
      }).catch(() => {
        this.snackBar.open('Failed to Added project', 'Close', { duration: 3000 });
      });
    }
    this.route.navigate(['admin/projects-details']);
  }

  save(project: any) {
    if (this.selectedFile) {
      this.uploadImage(project);
    } else {
      this.saveProject(project);
    }
  }

  async openDeleteModal() {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: true,
      backdrop: 'static', 
      keyboard: false, 
    });

    modalRef.componentInstance.title = 'Confirm Delete';
    modalRef.componentInstance.message = 'Are you sure you want to delete this project?';

    modalRef.closed.subscribe(async (result) => {
      if (result === 'confirm') {
        try {
          await this.projectService.delete(this.id);
          this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
          this.route.navigate(['admin/projects-details']);
        } catch (error) {
          this.snackBar.open('Failed to delete project', 'Close', { duration: 3000 });
          console.error('Delete error:', error);
        }
      }
    });
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };

    if (this.selectedFile) reader.readAsDataURL(this.selectedFile);
  }

  uploadImage(project: any) {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const filePath = `project-images/${Date.now()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    uploadTask.percentageChanges().subscribe(percent => {
      this.uploadPercentge = percent || 0;
    });

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          project.imageUrl = url;
          this.saveProject(project);
        });
      })
    ).subscribe();
  }

  private getFileNameFromUrl(url: string): string {
    const encodedFilename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
    const decodedPath = decodeURIComponent(encodedFilename.replace(/%2F/g, '/'));
    const fullFilename = decodedPath.substring(decodedPath.lastIndexOf('/') + 1);

    if (fullFilename.includes('_')) {
      return fullFilename.split('_').slice(1).join('_');
    }
    return fullFilename;
  }

  ngOnDestroy(): void {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }
}


