import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { MainserviceComponent } from './home/mainservice/mainservice.component';
import { MainaboutComponent } from './home/mainabout/mainabout.component';
import { MainprojectComponent } from './home/mainproject/mainproject.component';
import { BannerComponent } from './home/banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminProjectComponent } from './admin/admin-project/admin-project.component'; 
import { ProductFormComponent } from './admin/project-form/product-form.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { UserService } from 'src/services/user.service';
import { AdminAuthGuardService } from 'src/services/admin-auth-guard.service';
import { StatusService } from 'src/services/status.service';
import { ProjectService } from 'src/services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    TeamComponent,
    ServiceComponent,
    ContactComponent,
    MainserviceComponent,
    MainaboutComponent,
    MainprojectComponent,
    BannerComponent,
    FooterComponent,
    LoginComponent,
    AdminProjectComponent,
    ProductFormComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService, 
    StatusService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
