import { Component } from '@angular/core';
import { FiltroCItaDTO } from 'src/app/modelo/paciente/FiltroCItaDTO';

@Component({
  selector: 'app-consultas-paciente',
  templateUrl: './consultas-paciente.component.html',
  styleUrls: ['./consultas-paciente.component.css']
})
export class ConsultasPacienteComponent {

  medicoSeleccionado: string = '';
  fechaSeleccionada: string = ''

  seleccionarMedico() {
    console.log('Médico seleccionado:', this.medicoSeleccionado);
  
  }

  seleccionarFecha(event:any) {
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  
  }

}
