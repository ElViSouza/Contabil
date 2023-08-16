import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: FirebaseAuthService, 
    private toastr: ToastrService,
    public router: Router,
    ) {}

    onSubmit() {
      this.authService.register(this.email, this.password)
        .then(user => {
          // Registro bem-sucedido, você pode redirecionar ou executar outras ações aqui
          this.toastr.success('Usuário registrado:');
          this.email = ''; // Limpa o campo de email
          this.password = ''; // Limpa o campo de senha
        })
        .catch(error => {
          // Lidar com erros de registro
          this.toastr.warning('Erro de registro:', error);
          this.errorMessage = 'Erro ao registrar. Verifique suas credenciais e tente novamente.';
        });
    }

  isLogin() {
    this.router.navigate(['/login']);
  }
}
