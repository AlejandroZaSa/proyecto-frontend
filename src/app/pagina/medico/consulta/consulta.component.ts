import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { AtencionMedicoDTO } from 'src/app/modelo/medico/AtencionMedicoDTO';
import { ItemCitaMedicoDTO } from 'src/app/modelo/medico/ItemCitaMedicoDTO';
import { ItemConsultaMedicoPacienteDTO } from 'src/app/modelo/medico/ItemConsultaMedicoPacienteDTO';
import { RegistroTratamientoDTO } from 'src/app/modelo/medico/RegistroTratamientoDTO';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {

  fechaSeleccionada: string = ""
  alerta!: Alerta
  atencionDTO: AtencionMedicoDTO;
  itemCitaMedico: ItemCitaMedicoDTO;
  consultasPaciente: ItemConsultaMedicoPacienteDTO[];
  auxiliarConsultasPaciente: ItemConsultaMedicoPacienteDTO[];
  tratamiento: RegistroTratamientoDTO[];
  registroTratamiento: RegistroTratamientoDTO;
  medicamentos: string[]
  medicamento: string = ""
  codigoCita: number = 0;
  codigoConsulta: string = "";
  codigoPaciente: number = 0;
  codConsulta: number = 0
  auxiliarTratamiento: RegistroTratamientoDTO[];

  constructor(private route: ActivatedRoute, private router: Router, private medicoService: MedicoService, private tokenService: TokenService, private clinicaService: ClinicaService) {
    this.atencionDTO = new AtencionMedicoDTO;
    this.itemCitaMedico = new ItemCitaMedicoDTO;
    this.registroTratamiento = new RegistroTratamientoDTO;
    this.consultasPaciente = []
    this.auxiliarConsultasPaciente = []
    this.medicamentos = []
    this.tratamiento = []
    this.auxiliarTratamiento = []

    this.route.params.subscribe(params => {
      this.codigoCita = params['codigoCita'];
      this.codigoPaciente = params['codigoPaciente'];
      this.cargarConsultasPaciente(this.codigoPaciente);
      this.cargarMedicamento();
    });

  }

  public cargarConsultasPaciente(codigoPaciente: number) {

    this.medicoService.listarCitaPaciente(codigoPaciente).subscribe({
      next: data => {
        this.consultasPaciente = data.respuesta;
        this.auxiliarConsultasPaciente = Array.from(this.consultasPaciente)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public guardarHistoria() {

    this.atencionDTO.idCita = this.codigoCita;
    this.atencionDTO.tratamientoDTOList = Array.from(this.tratamiento)

    console.log(this.atencionDTO.idCita)
    console.log(this.atencionDTO.diagnostico)
    console.log(this.atencionDTO.notasMedico)
    console.log(this.atencionDTO.sintomas)
    console.log(this.atencionDTO.tratamientoDTOList)

    this.medicoService.atenderCita(this.atencionDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
        this.codigoConsulta = data.respuesta;
        this.codConsulta = parseInt(this.codigoConsulta.split(':')[1])
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public generarFactura() {

    this.medicoService.generarFactura(this.codConsulta).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  seleccionarFechaConsulta(event: any) {
    let fecha = event.target.value;
    console.log(fecha)
    console.log(this.fechaSeleccionada)
    if (this.fechaSeleccionada == "") {
      this.auxiliarConsultasPaciente = this.consultasPaciente;
    } else {
      this.auxiliarConsultasPaciente = this.consultasPaciente.filter(c => c.fecha == this.fechaSeleccionada);
    }
  }

  public cargarMedicamento() {

    this.clinicaService.listarMedicamentos().subscribe({
      next: data => {
        this.medicamentos = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public agregarTratamiento() {

    if (this.verificarMedicamento(this.registroTratamiento.nombreMedicamento)) {
      this.tratamiento.push({
        dosis: this.registroTratamiento.dosis, observaciones: this.registroTratamiento.observaciones,
        nombreMedicamento: this.registroTratamiento.nombreMedicamento
      });
    }
  }

  public seleccionarFila(item: any) {
    this.medicamento = item.nombreMedicamento;
    this.registroTratamiento.nombreMedicamento = item.nombreMedicamento;
    this.registroTratamiento.dosis = item.dosis;
    this.registroTratamiento.observaciones = item.observaciones;


  }

  public verificarMedicamento(medicamento: string): boolean {

    for (let i = 0; i < this.tratamiento.length; i++) {
      if (this.tratamiento[i].nombreMedicamento == medicamento) {
        return false;
      }
    }
    return true;
  }

  public eliminarMedicamento() {
    this.auxiliarTratamiento = Array.from(this.tratamiento)
    this.auxiliarTratamiento = this.auxiliarTratamiento.filter(item => this.medicamento !== item.nombreMedicamento);

    this.tratamiento = Array.from(this.auxiliarTratamiento)
  }

  public actualizarTratamiento() {

    this.auxiliarTratamiento = Array.from(this.tratamiento)


    for (let i = 0; i < this.auxiliarTratamiento.length; i++) {
      if(this.auxiliarTratamiento[i].nombreMedicamento === this.medicamento){
        this.auxiliarTratamiento[i].nombreMedicamento=this.registroTratamiento.nombreMedicamento;
        this.auxiliarTratamiento[i].dosis=this.registroTratamiento.dosis;
        this.auxiliarTratamiento[i].observaciones=this.registroTratamiento.observaciones;
      }
    }

    this.tratamiento = Array.from(this.auxiliarTratamiento)
  }
}
