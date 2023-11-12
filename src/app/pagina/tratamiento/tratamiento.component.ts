import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemTratamientoDTO } from 'src/app/modelo/clinica/ItemTratamientoDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';

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

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService) {
    this.route.params.subscribe(params => {
      this.codigoConsulta = params['codigoConsulta'];
      this.codonsulta = parseInt(this.codigoConsulta);
    });

    this.tratamiento = []
    this.auxiliarTratamiento = [];
    this.cargarTramtamiento();
  }

  public equalsIgnoreCase(str1: string, str2: string): boolean {
    return str1.toLocaleLowerCase() === str2.toLocaleLowerCase();
  }

  public buscarTratamiento() {
    if (this.textoIngresado == "") {
      this.auxiliarTratamiento = this.tratamiento;
    } else {
      this.auxiliarTratamiento = this.tratamiento.filter(t => this.equalsIgnoreCase(t.nombreMedicamento, this.textoIngresado) );
    }
  }
  public cargarTramtamiento() {
    this.pacienteService.verTratamiento(this.codonsulta).subscribe({
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
