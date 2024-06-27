import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { ServiceComponent } from './components/service/service.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/home', pathMatch:'full'
  },
  { 
    path:'home',
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
    path: 'home/admin', 
    component: LoginComponent
  },
  {
    path: 'home/admin',
    loadChildren: () => import('./components/admin/admin.module').then(mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
