import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { AdminAuthGuardService } from 'src/app/shared/services/admin-auth-guard.service';
import { ProductFormComponent } from './project-form/product-form.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: AdminProjectComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  { 
    path: 'dashboard/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  { 
    path: 'dashboard/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
