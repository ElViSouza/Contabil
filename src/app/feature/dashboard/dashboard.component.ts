import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    public authService: FirebaseAuthService,
  ) {}
}

