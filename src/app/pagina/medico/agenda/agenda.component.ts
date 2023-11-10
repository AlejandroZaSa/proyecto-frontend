import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {

  fechaSeleccionada: string = ''

  seleccionarFecha(event:any) {
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  
  }


}
