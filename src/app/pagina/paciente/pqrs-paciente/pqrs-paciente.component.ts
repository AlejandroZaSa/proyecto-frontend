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

  pqrsPacienteDTO: PQRSPacienteDTO;
  citaService: CitaService = new CitaService;

  cita: ItemCitaPqrsPaciente[]=this.citaService.listar();


  
  detalle: string = '';
 

  constructor(private pqrsService: PqrsService) {
    this.pqrsPacienteDTO = new PQRSPacienteDTO();
  }
  public crearPqrs() {
    this.pqrsService.crear(this.pqrsPacienteDTO);
  }
  public seleccionar(codigoCita: number) {
    this.pqrsPacienteDTO.codigoCita = codigoCita;
  }

  selectedCheckboxCount: number = 0;

  onCheckboxChange(event:any) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.selectedCheckboxCount = checkboxes.length;

    if(this.selectedCheckboxCount>1){
      event.target.checked=false;
    }
   
  }


  isButtonDisabled() {
    return this.detalle.trim() === '' || this.selectedCheckboxCount !== 1;
  }

}
