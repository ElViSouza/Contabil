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
}

