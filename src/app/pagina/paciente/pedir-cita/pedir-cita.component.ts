import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { CitaDTO } from 'src/app/modelo/paciente/CitaDTO';
import { FiltroCItaDTO } from 'src/app/modelo/paciente/FiltroCItaDTO';
import { ItemCitaPacienteDTO } from 'src/app/modelo/paciente/ItemCitaPacienteDTO';
import { ItemMedicoCitaDTO } from 'src/app/modelo/paciente/ItemMedicoCitaDTO';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css']
})
export class PedirCitaComponent {

  alerta!: Alerta
  filtroCitaDTO: FiltroCItaDTO;
  citaDTO: CitaDTO;
  citasPaciente: ItemCitaPacienteDTO[];
  auxiliarCitas: ItemCitaPacienteDTO[];
  fechaCitaSeleccionada: string = ''
  especialidades: string[];
  listaMedicoCitaDTO: ItemMedicoCitaDTO[];
  idMedico:number=0
  hora:string=""
  selectedCheckboxCount: number = 0;
  
  constructor(private clinicaService: ClinicaService, private pacienteService: PacienteService, private tokenService: TokenService) {
    this.filtroCitaDTO = new FiltroCItaDTO;
    this.citaDTO = new CitaDTO;
    this.especialidades = [];
    this.citasPaciente = [];
    this.listaMedicoCitaDTO = [];
    this.auxiliarCitas = this.citasPaciente;
    this.cargarEspecialidades();
    this.mostrarCitasPaciente();
  
  }

  public seleccionarFila(item: any) {
    //this.idMedico = item.codigoMedico;
    //this.hora = item.hora;
  }

  public buscarCitas() {

    this.pacienteService.filtrarMedicoCita(this.filtroCitaDTO).subscribe({
      next: data => {
        this.listaMedicoCitaDTO = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        this.listaMedicoCitaDTO=[]
      }
    });
  }

  public cargarEspecialidades() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        this.especialidades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public pedirCita() {

    let codigoPaciente = this.tokenService.getCodigo();
    this.citaDTO.idPaciente = codigoPaciente;
   

    console.log(this.citaDTO.fecha);
    console.log(this.citaDTO.hora);
    console.log(this.citaDTO.idMedico);
    console.log(this.citaDTO.idPaciente);
    console.log(this.citaDTO.motivo);

    this.pacienteService.agendarCita(this.citaDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public mostrarCitasPaciente() {
    let codigoPaciente = this.tokenService.getCodigo();

    this.pacienteService.listarCitas(codigoPaciente).subscribe({
      next: data => {
        this.citasPaciente = data.respuesta;
        this.auxiliarCitas = Array.from(this.citasPaciente)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  seleccionarFechaCita(event: any) {
    let fecha = event.target.value;
    console.log(fecha)
    console.log(this.fechaCitaSeleccionada)
    if (this.fechaCitaSeleccionada == "") {
      this.auxiliarCitas = this.citasPaciente;
    } else {
      this.auxiliarCitas = this.citasPaciente.filter(c => c.fechaCita == this.fechaCitaSeleccionada);
    }
  }

  isButtonDisabled() {
    return this.citaDTO.motivo.trim() === '' || this.selectedCheckboxCount !== 1;
  }

  public seleccionar(item:any) {
    this.citaDTO.idMedico = item.codigoMedico;
    this.citaDTO.hora = item.hora;
    console.log(this.citaDTO.idMedico)
    console.log(this.citaDTO.hora)
  }

  onCheckboxChange(event: any) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.selectedCheckboxCount = checkboxes.length;

    if (this.selectedCheckboxCount > 1) {
      event.target.checked = false;
    }

  }

}
