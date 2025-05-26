import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { ContactServiceService } from 'src/app/shared/services/contact-service.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { AdminAuthGuardService } from 'src/app/shared/services/admin-auth-guard.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
        BrowserModule, 
        BrowserAnimationsModule,
        NgbModule, 
        NgImageSliderModule, 
        AngularFireModule.initializeApp(environment.firebaseConfig), 
        AngularFireAuthModule, 
        AngularFireDatabaseModule, 
        AngularFireStorageModule, 
        AngularFirestoreModule,
        MatDialogModule
      ),
        AuthService,
        AuthGuardService,
        UserService,
        AdminAuthGuardService,
        StatusService,
        ProjectService,
        ContactServiceService, 
  ]
};

