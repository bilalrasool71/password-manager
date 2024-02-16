import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MenubarComponent } from './menubar/menubar.component';
import { WebsitesListComponent } from './websites-list/websites-list.component';
import { UtilsModule } from './utils/utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { PasswordListComponent } from './password-list/password-list.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    WebsitesListComponent,
    PasswordListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UtilsModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "ngpassword", "appId": "1:223214044239:web:d8baa0ce76038e025f563a", "storageBucket": "ngpassword.appspot.com", "apiKey": "AIzaSyBsjMk6RT35tPeGBlrd27e7Sb_colKX_fU", "authDomain": "ngpassword.firebaseapp.com", "messagingSenderId": "223214044239", "measurementId": "G-YHGCMRNJQE" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
