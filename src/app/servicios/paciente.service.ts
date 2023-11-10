import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/otros/mensaje-dto';
import { ActualizarPacienteDTO } from '../modelo/paciente/ActualizarPacienteDTO';
import { PQRSPacienteDTO } from '../modelo/paciente/PQRSPacienteDTO';
import { RespuestaPacientePqrsDTO } from '../modelo/paciente/RespuestaPacientePqrsDTO';
import { CitaDTO } from '../modelo/paciente/CitaDTO';
import { FiltroCItaDTO } from '../modelo/paciente/FiltroCItaDTO';
import { BusquedaConsultaDTO } from '../modelo/paciente/BusquedaConsultaDTO';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private userUrl = "http://localhost:8081/api/pacientes";
  constructor(private http: HttpClient) { }

  public editarPerfil(codigoPaciente: number, pacienteDTO: ActualizarPacienteDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/editar-perfil/${codigoPaciente}`, pacienteDTO);
  }

  public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }

  public cargarDatosPacientePaciente(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/datospaciente/${codigo}`);
  }

  public agendarCita(citaDTO: CitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agendar-cita`, citaDTO);
  }

  public crearPQRS(pqrsPacienteDTO: PQRSPacienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/crear-pqrs`, pqrsPacienteDTO);
  }

  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-pqrs/${codigoPaciente}`);
  }

  public responderPqrs(respuestaPqrsDTO: RespuestaPacientePqrsDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/responder-pqrs`, respuestaPqrsDTO);
  }

  public listarCitas(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas/${codigoPaciente}`);
  }

  public listarCitasPqrs(idPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-pqrs/${idPaciente}`);
  }

  public buscarConsulta(busquedaConsultaDTO: BusquedaConsultaDTO): Observable<MensajeDTO> {
    return this.http.request<MensajeDTO>('get', `${this.userUrl}/buscar-consulta`, { body: busquedaConsultaDTO});
  }

  public filtrarMedicoCita(filtroCitaDTO: FiltroCItaDTO): Observable<MensajeDTO> {
    return this.http.request<MensajeDTO>('get', `${this.userUrl}//filtrar-medico-cita`, { body: filtroCitaDTO});
  }

  public verTratamiento(codigoConsulta: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/tratamiento/${codigoConsulta}`);
  }

  public mostrarHistorialMensajesPqrs(codigoPqrs: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/historial-mensajes-pqrs/${codigoPqrs}`);
  }
}