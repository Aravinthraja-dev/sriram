import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError, forkJoin, map, of, Subscription, switchMap, tap } from 'rxjs';
import { ImageForm } from 'src/app/shared/model/image-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageFormComponent } from '../image-form/image-form.component';
import { ImageService } from 'src/app/shared/services/image.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-image-gallary',
  standalone: true,
  imports: [MatPaginatorModule, MatSortModule, MatTableModule, TitleCasePipe],
  templateUrl: './image-gallary.component.html',
  styleUrl: './image-gallary.component.css'
})
export class ImageGallaryComponent implements OnInit {

  displayedColumns: string[] = ['imageTitle', 'image', 'page', 'blocks', 'edit'];
  dataSource = new MatTableDataSource<ImageForm>();
  subscription!: Subscription;

  @ViewChild('sortProject') sortProject!: MatSort;
  @ViewChild('paginatorProject') paginatorProject!: MatPaginator;

  constructor(
    private modalService: NgbModal,
    private imageService: ImageService,
    private pageService: StatusService
  ) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.subscription = this.imageService.getAll().pipe(
      switchMap((images: ImageForm[]) => {
        const uniquePages = [...new Set(images.map(img => img.PageCategory).filter(Boolean))];

        if (uniquePages.length === 0) {
          return of(images.map(img => ({
            ...img,
            displayValue: img.PageSubCategory
          })));
        }

        const subOptionsRequests = uniquePages.map(pageName =>
          this.pageService.getSubOptions(pageName).pipe(
            map(subOptions => ({ pageName, subOptions })),
            catchError(err => {
              console.error(`[6] Error fetching "${pageName}":`, err);
              return of({ pageName, subOptions: {} });
            })
          )
        );

        return forkJoin(subOptionsRequests).pipe(
          map(subOptionsResults => {
            const subOptionsMap = subOptionsResults.reduce((acc, { pageName, subOptions }) => {
              acc[pageName] = subOptions || {};
              return acc;
            }, {} as { [key: string]: any });

            return images.map(image => ({
              ...image,
              displayValue: subOptionsMap[image.PageCategory]?.[image.PageSubCategory] || image.PageSubCategory
            }));
          })
        );
      }),

      tap({
        next: (images: any) => {
          this.dataSource.data = images;
          this.dataSource.sort = this.sortProject;
          this.dataSource.paginator = this.paginatorProject;
        }
      }),
      catchError((err) => {
        console.error('Error in load Projects', err);
        return of([])
      })
    ).subscribe({
      complete: () => console.log('[13] Subscription completed')
    });
  }


  onFilter(input: string): void {
    this.dataSource.filter = input.trim().toLowerCase();
  }

  openImageForm() {
    const matRef = this.modalService.open(ImageFormComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    })
  }

  openModel(key: string) {
    const matRef = this.modalService.open(ImageFormComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    })

    matRef.componentInstance.id = key;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
