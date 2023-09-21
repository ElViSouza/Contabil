import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './feature/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SigninComponent } from './feature/signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './feature/register-user/register-user.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { DashComponent } from './feature/components/dash/dash.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { TopHeaderComponent } from './feature/components/headers/top-header/top-header.component';
import { ExpensesComponent } from './feature/components/expenses/expenses.component';
import { FooterHeaderComponent } from './feature/components/headers/footer-header/footer-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconDefaultOptions, MatIconModule } from '@angular/material/icon';
import {MatIconTestingModule} from '@angular/material/icon/testing';
import { SummaryComponent } from './feature/components/summary/summary.component';
import { CommonModule } from '@angular/common';

// const MAT_ICON_DEFAULT_OPTIONS: InjectionToken<MatIconDefaultOptions>;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    RegisterUserComponent,
    DashboardComponent,
    DashComponent,
    TopHeaderComponent,
    FooterHeaderComponent,
    ExpensesComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatIconTestingModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
