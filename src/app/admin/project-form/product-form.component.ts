import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ProjectService } from 'src/services/project.service';
import { StatusService } from 'src/services/status.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

  status$;
  project: any = {}; 
  id;

  constructor(
    statusService: StatusService, 
    private projectService: ProjectService, 
    private route:Router,
    private router: ActivatedRoute) { 
    this.status$ = statusService.getStatus();
  
    this.id = this.router.snapshot.paramMap.get('id');
      if(this.id){
        this.projectService.get(this.id).pipe(take(1)).subscribe((p:any) => {
          this.project = p
        })
      }
  }

  save(project:any){   
    if(this.id){
      //this.projectService.update(this.id,product);
    }
    else{
      this.projectService.create(project);
    }
    this.route.navigate(['/admin/dashboard']);
  }
}


