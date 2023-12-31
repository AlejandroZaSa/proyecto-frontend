import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroPacienteDTO } from '../modelo/paciente/registro-paciente-dto';
import { LoginDTO } from '../modelo/clinica/login-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';
import { CambioPasswordDTO } from '../modelo/clinica/CambioPasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8081/api/auth";

  constructor(private http: HttpClient) { }

  public registrarPaciente(paciente: RegistroPacienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-paciente`, paciente);
  }

  public login(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, loginDTO);
  }

  public cambiarPassword(cambiarPassword:CambioPasswordDTO):Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.authURL}/cambiar-password`, cambiarPassword);
  }
}
