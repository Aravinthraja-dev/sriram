import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ProjectService } from 'src/app/shared/services/project.service';
import { StatusService } from 'src/app/shared/services/status.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class ProductFormComponent{

  status$;
  project: any = {}; 
  id;
  fileUrl: string | undefined;
  fileName: string | undefined;
  previewImage: string | undefined;

  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string | undefined>;
  selectedFile: File | undefined;

  constructor(
    statusService: StatusService, 
    private projectService: ProjectService, 
    private route:Router,
    private router: ActivatedRoute) { 
    this.status$ = statusService.getStatus();
  
    this.id = this.router.snapshot.paramMap.get('id');
      if(this.id){
        this.projectService.get(this.id).pipe(take(1)).subscribe((p:any) => {
          this.project = p;
        });
      }

  }

  save(project:any){   
    if(this.id){
      this.projectService.update(this.id,project);
    }
    else{
      this.projectService.create(project);
    }
    this.route.navigate(['/admin/dashboard']);
  }

  delete(){
    if(!confirm("Are you want to delete this project")) return;
      this.projectService.delete(this.id);
      this.route.navigate(['/admin/dashboard']);
  }
}


