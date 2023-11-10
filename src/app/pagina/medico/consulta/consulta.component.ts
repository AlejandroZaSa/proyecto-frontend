import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  fechaSeleccionada: string = ''
  seleccionarFecha(event:any) {
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  
  }

}
