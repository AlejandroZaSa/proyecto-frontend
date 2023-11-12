import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';
import { Observable } from 'rxjs';
import { CambioPasswordDTO } from '../modelo/clinica/CambioPasswordDTO';
@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  private clinicaURL = "http://localhost:8081/api/clinica";
  constructor(private http: HttpClient) { }

  public listarCiudades(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/ciudades`);
  }
  public listarEstadosPqrs(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/estados-pqrs`);
  }
  public listarTipoSangre(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/tipos-sangre`);
  }
  public listarEPS(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/eps`);
  }
  public listarMedicamentos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/medicamentos`);
  }
  public listarEspecialidades(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/especialidades`);
  }
  public verTratamiento(codigoConsulta:number):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/ver-tratamiento/${codigoConsulta}`);
  }

  public enviarLinkRecuperacion(email:string):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/enviar-link-recuperacion/${email}`);
  }
}

