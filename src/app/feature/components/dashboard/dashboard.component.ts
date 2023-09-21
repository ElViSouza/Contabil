import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    public authService: FirebaseAuthService,
    private router: Router,
  ) { }

  next() {
    this.router.navigate(['/inicio']);
  }
  getFirstNameFromEmail(email: string): string {
    // Divida o email usando o "@" como separador e pegue a primeira parte
    const emailParts = email.split('@');
    return emailParts[0];
  }
}

