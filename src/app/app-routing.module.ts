import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './feature/signin/signin.component';
import { HomeComponent } from './feature/home/home.component';
import { RegisterUserComponent } from './feature/register-user/register-user.component';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { DashComponent } from './feature/components/dash/dash.component';
import { TopHeaderComponent } from './feature/components/headers/top-header/top-header.component';
import { ExpensesComponent } from './feature/components/expenses/expenses.component';
import { SummaryComponent } from './feature/components/summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'inicio', component: DashComponent },
  { path: 'top-header', component: TopHeaderComponent },
  { path: 'despesas', component: ExpensesComponent },
  { path: 'resumo', component: SummaryComponent },
  { path: '**', redirectTo: '/login' }, // Rota para lidar com URLs inválidas  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
