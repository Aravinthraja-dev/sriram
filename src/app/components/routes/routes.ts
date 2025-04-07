import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { AboutComponent } from "../pages/about/about.component";
import { ProjectsComponent } from "../pages/projects/projects.component";
import { TeamComponent } from "../pages/team/team.component";
import { ServiceComponent } from "../pages/service/service.component";
import { ContactComponent } from "../pages/contact/contact.component";
import { LoginComponent } from "../login/login.component";

export const content: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'team',
        component: TeamComponent
    },
    {
        path: 'service',
        component: ServiceComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        loadChildren: () => import('../../components/admin/admin.module').then(mod => mod.AdminModule)
    },
]