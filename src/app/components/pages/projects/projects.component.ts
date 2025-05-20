import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ScrollAnimateDirective } from 'src/app/shared/directives/scrollAnimate';
import { ImageForm } from 'src/app/shared/model/image-form';
import { Project } from 'src/app/shared/model/project';
import { ImageService } from 'src/app/shared/services/image.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, ScrollAnimateDirective]
})
export class ProjectsComponent implements OnInit {
  project: Project[] = [];
  filteredProject: Project[] = [];
  projectStatus: any;
  isSorted: boolean = false;
  searchControl = new FormControl();

  isLoading = false;
  lastKey?: string;
  limit = 6;
  hasMore = true;

  projectBanner: ImageForm = {
    imageTitle: '',
    image: '',
    PageCategory: '',
    PageSubCategory: ''
  };

  constructor(
    private projectService: ProjectService,
    private imageService: ImageService
  ) { }

  windowWidth = window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.loadInitialProjects();
      
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filteredProject = this.project.filter(project => project.projectTitle.toLowerCase().includes(value.toLowerCase()));
    })

    this.imageService.getAll().subscribe(data => {
      this.projectBanner = data.find(
        item => item.PageCategory === 'project' && item.PageSubCategory === 'projectBanner'
      ) as ImageForm;
    })
  }

  sortProject() {
    this.isSorted = !this.isSorted;
    
    if (this.isSorted) {
      this.filteredProject = [...this.filteredProject].sort((a, b) =>
        a.projectTitle.localeCompare(b.projectTitle)
      );
    } else {
      this.filteredProject = [...this.project];
    }
  }

  onSelectChange(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    const selectedValue = selectedElement.value;

    switch (selectedValue) {
      case 'all':
        this.filteredProject = this.project;
        break;
      case 'ongoing':
        this.filteredProject = this.project.filter(project => {
          console.log('Project ', project)
          return project.projectStatus === selectedValue
        });
        break;
      case 'completed':
        this.filteredProject = this.project.filter(project => project.projectStatus === selectedValue)
        break;
    }
  }

  loadInitialProjects() {
    this.isLoading = true;
    this.projectService.getInitialProjects(this.limit)
      .subscribe({
        next: (projects: any) => {
          if (projects.length > 0) {
            this.project = projects;
            this.filteredProject = [...this.project];
            this.lastKey = projects[projects.length - 1].key;
          }
          this.isLoading = false;
          this.hasMore = projects.length === this.limit;
        },
        error: (err) => {
          console.error('Error loading projects:', err);
          this.isLoading = false;
        }
      });
  }

  loadMoreProjects() {
    if (this.isLoading || !this.hasMore || !this.lastKey) return;

    this.isLoading = true;
    this.projectService.getNextProjects(this.lastKey, this.limit)
      .subscribe({
        next: (newProjects: any) => {
          if (newProjects.length > 0) {
            this.project = [...this.project, ...newProjects];
            this.filteredProject = [...this.project];
            this.lastKey = newProjects[newProjects.length - 1].key;
          }
          this.isLoading = false;
          this.hasMore = newProjects.length === this.limit;
        },
        error: (err) => {
          console.error('Error loading more projects:', err);
          this.isLoading = false;
        }
      });
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const offsetHeight = document.body.offsetHeight;
    const threshold = this.windowWidth > 768 ? 300 : 900;

    if (scrollPosition > offsetHeight - threshold && !this.isLoading) {
      this.loadMoreProjects();
    }
  }
}
