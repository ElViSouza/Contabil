import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-footer-header',
  templateUrl: './footer-header.component.html',
  styleUrls: ['./footer-header.component.scss']
})
export class FooterHeaderComponent implements OnInit {
  activeButton: string = 'icon1';

  constructor(
    private router: Router,
    public authService: FirebaseAuthService,
  ) { }

  ngOnInit() {
    $(document).ready(function() {
      $(".icon").click(function() {
        // Remove a classe "active" de todos os ícones
        $(".icon").removeClass("active");
        
        // Adiciona a classe "active" apenas ao ícone clicado
        $(this).addClass("active");
      });
    });
  }
  dashboard() {
    this.router.navigate(['/dashboard']);
  }
  renda() {
    this.router.navigate(['/inicio']);
  }
  sair() {
    this.authService.SignOut();
  }
  despesas() {
    this.router.navigate(['/despesas']);
  }
  resumo() {
    this.router.navigate(['/resumo']);
  }
}
