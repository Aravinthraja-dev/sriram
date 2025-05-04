import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { AdminAuthGuardService } from 'src/app/shared/services/admin-auth-guard.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { ImageGallaryComponent } from './image-gallary/image-gallary.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },  
      { 
        path: 'projects-details', 
        component: AdminProjectComponent, 
      },
      {
        path: 'admin-message',
        component: AdminMessageComponent,
      },
      {
        path: 'image-gallary',
        component: ImageGallaryComponent,
      },
      { 
        path: 'dashboard/new', 
        component: ProductFormComponent, 
      },
      { 
        path: 'dashboard/:id', 
        component: ProductFormComponent, 
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
