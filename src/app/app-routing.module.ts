import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './feature/signin/signin.component';
import { HomeComponent } from './feature/home/home.component';
import { RegisterUserComponent } from './feature/register-user/register-user.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: '**', redirectTo: '/login' }, // Rota para lidar com URLs inválidas  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
