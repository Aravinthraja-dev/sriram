import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AdminAuthGuardService } from 'src/app/services/admin-auth-guard.service';
import { ProductFormComponent } from './project-form/product-form.component';

const routes: Routes = [
  { 
    path: 'admin/dashboard', 
    component: AdminProjectComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  { 
    path: 'admin/dashboard/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  { 
    path: 'admin/dashboard/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
