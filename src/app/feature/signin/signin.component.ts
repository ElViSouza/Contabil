import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: FirebaseAuthService,  
    public router: Router,
    private toastr: ToastrService,
    ) {}

  onSubmit() {
    this.authService.signIn(this.email, this.password)
      .then(user => {
        this.router.navigate(['/dashboard']);
        // Login bem-sucedido, você pode redirecionar ou executar outras ações aqui
        this.toastr.success('Usuário autenticado:');
      })
      .catch(error => {
        // Lidar com erros de autenticação
        this.toastr.warning('Erro de autenticação:', error);
        this.errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
      });
  }

  isRegister() {
    this.router.navigate(['/register']);
  }
}
