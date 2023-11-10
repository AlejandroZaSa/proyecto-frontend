import { Component } from '@angular/core';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css']
})
export class PedirCitaComponent {

  especialidadSeleccionada:string=''
  fechaSeleccionada:string=''
  fechaCitaSeleccionada:string=''

  seleccionarEspecialidad(){
    console.log("Especialidad seleccionada " + this.especialidadSeleccionada);
  }

  seleccionarFecha(event:any){
    console.log("Fecha seleccionada " + this.fechaSeleccionada);
  }

  seleccionarFechaCita(event:any){
    console.log("Fecha cita seleccionada " + this.fechaCitaSeleccionada);
  }

}
