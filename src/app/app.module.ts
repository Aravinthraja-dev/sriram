import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './components/admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { ServiceComponent } from './components/service/service.component';
import { ContactComponent } from './components/contact/contact.component';
import { MainserviceComponent } from './components/home/mainservice/mainservice.component';
import { MainaboutComponent } from './components/home/mainabout/mainabout.component';
import { MainprojectComponent } from './components/home/mainproject/mainproject.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProjectComponent } from './components/admin/admin-project/admin-project.component'; 
import { ProductFormComponent } from './components/admin/project-form/product-form.component';
import { AchivementsComponent } from './components/home/achivements/achivements.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';
import { AdminAuthGuardService } from 'src/app/services/admin-auth-guard.service';
import { StatusService } from 'src/app/services/status.service';
import { ProjectService } from 'src/app/services/project.service';
import { ContactServiceService } from 'src/app/services/contact-service.service';

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
    AchivementsComponent
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
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService, 
    StatusService,
    ProjectService,
    ContactServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
