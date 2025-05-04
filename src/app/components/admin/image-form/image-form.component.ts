import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileInputComponent } from '../file-input/file-input.component';
import { ImageForm } from 'src/app/shared/model/image-form';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/shared/services/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/shared/services/status.service';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [FormsModule, FileInputComponent, KeyValuePipe, TitleCasePipe],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css'
})
export class ImageFormComponent implements OnInit, OnDestroy {
  isEditMode!: boolean;
  image: any = {};
  previewImage: string | ArrayBuffer | null = null;
  currentImageUrl: string | null = null;
  selectedFile: File | null = null;
  uploadPercentge: number = 0;
  selectedFileName: string | null = null;
  @Input() id!: string;
  private destroy = new Subject<void>();
  pageList: string[] = []
  subOptions: { [key: string]: string } = {}
  selectedPage: string = ''

  constructor(
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private imageService: ImageService,
    private modelService: NgbModal,
    private router: Router,
    private pageService: StatusService
  ) { }

  ngOnInit(): void {
    this.loadImage();

    this.pageService.getPages().subscribe(data => {
      this.pageList = data.map(p => p.key);
    })

  }

  loadImage() {
    if (!this.id) return;

    this.imageService.get(this.id)
      .pipe(takeUntil(this.destroy))
      .subscribe((images: any) => {
        this.image = images;
        this.selectedPage = images?.PageCategory;
        this.currentImageUrl = images?.image;
        this.previewImage = images?.image;
        this.selectedFileName = this.getFileNameFromUrl(images?.image);
        this.isEditMode = true;

        this.pageService.getSubOptions(this.selectedPage).subscribe(subs => {
          this.subOptions = subs || {}
        })
      })
  }

  saveImage(image: any) {
    if (this.id) {
      this.imageService.update(this.id, image).then(() => {
        this.snackBar.open('Image Updated successfully', 'Close', { duration: 3000 });
      }).catch(() => {
        this.snackBar.open('Failed to Update Image', 'Close', { duration: 3000 });
      });
    }
    else {
      this.imageService.create(image).then(() => {
        this.snackBar.open('Image Added successfully', 'Close', { duration: 3000 });
      }).catch(() => {
        this.snackBar.open('Failed to Added Image', 'Close', { duration: 3000 });
      });
    }
    this.modelService.dismissAll();
  }

  save(image: ImageForm) {
    if (this.selectedFile) {
      this.uploadImage(image);
    } else {
      this.saveImage(image);
    }
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

  uploadImage(image: ImageForm) {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const filePath = `all-images/${Date.now()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    uploadTask.percentageChanges().subscribe(percent => {
      this.uploadPercentge = percent || 0;
    });

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          image.image = url;
          this.saveImage(image);
        });
      })
    ).subscribe();
  }

  private getFileNameFromUrl(url: string): string {
    const encodedFilename = url?.substring(url.lastIndexOf('/') + 1).split('?')[0];
    const decodedPath = decodeURIComponent(encodedFilename?.replace(/%2F/g, '/'));
    const fullFilename = decodedPath.substring(decodedPath?.lastIndexOf('/') + 1);

    if (fullFilename?.includes('_')) {
      return fullFilename?.split('_').slice(1).join('_');
    }
    return fullFilename;
  }

  async openDeleteModal() {
    const modalRef = this.modelService.open(ConfirmDialogComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.title = 'Confirm Delete';
    modalRef.componentInstance.message = 'Are you sure you want to delete this project?';

    modalRef.closed.subscribe(async (result) => {
      if (result === 'confirm') {
        try {
          await this.imageService.delete(this.id);
          this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
          this.selectedFileName = '';

          this.router.navigate(['admin/image-gallary']);
          this.modelService.dismissAll();
        } catch (error) {
          this.snackBar.open('Failed to delete project', 'Close', { duration: 3000 });
          console.error('Delete error:', error);
        }
      }
    });
  }

  onPageSelection(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedPage = selectElement.value;
    this.pageService.getSubOptions(this.selectedPage).subscribe(subs => {
      this.subOptions = subs || {}
    })
  }

  closeModel() {
    this.modelService.dismissAll();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.asObservable();
  }
}
