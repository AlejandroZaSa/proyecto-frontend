import { Component } from '@angular/core';
import { ItemPQRSDTO } from 'src/app/modelo/clinica/ItemPQRSDTO';
import { ItemCitaPqrsPaciente } from 'src/app/modelo/paciente/ItemCitaPqrsPacienteDTO';
import { CitaService } from 'src/app/servicios/cita.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-pqrs-admin',
  templateUrl: './pqrs-admin.component.html',
  styleUrls: ['./pqrs-admin.component.css']
})
export class PqrsAdminComponent {
  pqrs: ItemPQRSDTO[];
  
  auxiliar: ItemPQRSDTO[];

  constructor(private pqrsService: PqrsService, private citaService: CitaService) {
    this.pqrs = pqrsService.listar();
    this.auxiliar= this.pqrs;
    
  }

  public filtrarTabla(event:any){
      let estadoSelecionado = event.target.value;
      if(estadoSelecionado == ""){
        this.auxiliar = this.pqrs;
      }else{
        this.auxiliar = this.pqrs.filter( p => p.estadoPqrs == estadoSelecionado );
      }
  } 
}
