import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    importProvidersFrom(
        BrowserModule, 
        NgbModule, 
        NgImageSliderModule, 
        AngularFireModule.initializeApp(environment.firebaseConfig), 
        AngularFireAuthModule, 
        AngularFireDatabaseModule, 
        AngularFireStorageModule, 
        AngularFirestoreModule),
        AuthService,
        AuthGuardService,
        UserService,
        AdminAuthGuardService,
        StatusService,
        ProjectService,
        ContactServiceService,
    
  ]
};

