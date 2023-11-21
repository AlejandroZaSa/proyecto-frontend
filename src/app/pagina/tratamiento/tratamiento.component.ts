import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemTratamientoDTO } from 'src/app/modelo/clinica/ItemTratamientoDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent {

  textoIngresado: string = "";
  codigoConsulta: string = "";
  codonsulta: number = 0;
  alerta!: Alerta
  tratamiento: ItemTratamientoDTO[];
  auxiliarTratamiento: ItemTratamientoDTO[];

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService, private medicoService:MedicoService, private tokenService: TokenService) {
    this.route.params.subscribe(params => {
      this.codigoConsulta = params['codigoConsulta'];
      this.codonsulta = parseInt(this.codigoConsulta);
    });

    this.tratamiento = []
    this.auxiliarTratamiento = [];
    this.cargarTramtamiento();
  }

  public cargarTramtamiento() {

    if(this.tokenService.getRole() == "paciente"){

      this.pacienteService.verTratamiento(this.codonsulta).subscribe({
        next: data => {
          this.tratamiento = data.respuesta;
          this.auxiliarTratamiento = Array.from(this.tratamiento)
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });

    }else{
      this.medicoService.verTratamiento(this.codonsulta).subscribe({
        next: data => {
          this.tratamiento = data.respuesta;
          this.auxiliarTratamiento = Array.from(this.tratamiento)
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });
      
    }

  }

  public filtrarMedicamento(event: any) {
    const nombre = event.target.value;
    this.auxiliarTratamiento = this.tratamiento.filter(t => t.nombreMedicamento.toLowerCase().includes(nombre.toLowerCase()) );
   
  }
}
