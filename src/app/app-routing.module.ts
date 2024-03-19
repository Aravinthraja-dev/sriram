import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AdminProjectComponent } from './admin/admin-project/admin-project.component';
import { AuthGuardService } from 'src/services/auth-guard.service';

const routes: Routes = [
  { 
    path:'',
    component: HomeComponent 
  },
  { 
    path:'about',
    component: AboutComponent 
  },
  { 
    path:'projects',
    component: ProjectsComponent 
  },
  { 
    path:'team',
    component: TeamComponent 
  },
  { 
    path:'service',
    component: ServiceComponent 
  },
  { 
    path:'contact',
    component: ContactComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'dashboard', 
    component: AdminProjectComponent, 
    canActivate: [AuthGuardService]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
