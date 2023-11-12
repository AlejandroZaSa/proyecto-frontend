import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';
import { Observable } from 'rxjs';
import { AtencionMedicoDTO } from '../modelo/medico/AtencionMedicoDTO';
import { DiaLibreDTO } from '../modelo/medico/DiaLibreDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private userUrl = "http://localhost:8081/api/medicos";
  constructor(private http: HttpClient) { }

  public atenderCita(atencionMedico: AtencionMedicoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/atender-cita`, atencionMedico);
  }

  public listarCitasPendientes(codigoMedico:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-pendientes/${codigoMedico}`);
  }

  public listarCitaPaciente(codigoPaciente:number): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-cita-paciente/${codigoPaciente}`);
  }

  public agendarDiaLibre(diaLibre:DiaLibreDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agendar-dia-libre`, diaLibre);
  }

  public listarCitasRealizadasMedico(codigoMedico:number): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-realizadas/${codigoMedico}`);
  }

  /*public generarFactura(codigoConsulta:number): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/generar-factura/${codigoConsulta}`);
  }*/

  public mostrarDetalleFactura(codigoConsulta:number): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle-factura/${codigoConsulta}`);
  }
  
  public verTratamiento(codigoConsulta: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/tratamiento/${codigoConsulta}`);
  }
  
}