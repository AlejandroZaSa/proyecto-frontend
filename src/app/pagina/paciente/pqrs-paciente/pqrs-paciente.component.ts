import { Component} from '@angular/core';
import { ItemCitaPqrsPaciente } from 'src/app/modelo/paciente/ItemCitaPqrsPacienteDTO';
import { PQRSPacienteDTO } from 'src/app/modelo/paciente/PQRSPacienteDTO';
import { CitaService } from 'src/app/servicios/cita.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-pqrs-paciente',
  templateUrl: './pqrs-paciente.component.html',
  styleUrls: ['./pqrs-paciente.component.css']
})
export class PqrsPacienteComponent {

  estadoSeleccionado: string =''

  pqrsPacienteDTO: PQRSPacienteDTO;
  

  citaService: CitaService = new CitaService;

  cita: ItemCitaPqrsPaciente[]=this.citaService.listar();
  
  selectedCheckboxCount: number = 0;
  auxiliarCitas: ItemCitaPqrsPaciente[];

  
  detalle: string = '';
 

  constructor(private pqrsService: PqrsService) {
    this.pqrsPacienteDTO = new PQRSPacienteDTO();
    this.auxiliarCitas = this.cita;
  }
  public crearPqrs() {
    this.pqrsService.crear(this.pqrsPacienteDTO);
  }
  public seleccionar(codigoCita: number) {
    this.pqrsPacienteDTO.codigoCita = codigoCita;
  }



  onCheckboxChange(event:any) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.selectedCheckboxCount = checkboxes.length;

    if(this.selectedCheckboxCount>1){
      event.target.checked=false;
    }
   
  }

  public seleccionarFecha(event:any){
    let fecha = event.target.value;
    if(fecha == ""){
      this.auxiliarCitas = this.cita;
    }else{
      this.auxiliarCitas = this.cita.filter( c => c.fecha == fecha );
    }
  }


  isButtonDisabled() {
    return this.detalle.trim() === '' || this.selectedCheckboxCount !== 1;
  }

  seleccionarEstado(){
    console.log("Estado seleccionado: "+ this.estadoSeleccionado)
  }

}
