import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginDTO } from 'src/app/modelo/clinica/login-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDTO: LoginDTO;
  alerta!: Alerta;

  constructor(private tokenService: TokenService, private authService: AuthService, private clinicaService: ClinicaService) {
    this.loginDTO = new LoginDTO();
  }

  public login() {
    this.authService.login(this.loginDTO).subscribe({
      next: data => {
        this.tokenService.login(data.respuesta.token);

      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };

      }
    });
  }

  enviarLinkRecuperacion(event: Event) {
    event.preventDefault();

    let email : string =""

    this.clinicaService.enviarLinkRecuperacion(email).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
}
