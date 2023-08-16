import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    public authService: FirebaseAuthService,
  ) {}
}
