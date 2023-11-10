import { Component } from '@angular/core';

@Component({
  selector: 'app-historico-consultas',
  templateUrl: './historico-consultas.component.html',
  styleUrls: ['./historico-consultas.component.css']
})
export class HistoricoConsultasComponent {
  fechaSeleccionada: string = ''
  seleccionarFecha(event:any) {
    console.log('Fecha seleccionada:', this.fechaSeleccionada);

  }

}
