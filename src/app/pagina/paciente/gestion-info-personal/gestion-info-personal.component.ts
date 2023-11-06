import { Component } from '@angular/core';
import { ActualizarPacienteDTO } from 'src/app/modelo/paciente/ActualizarPacienteDTO';

@Component({
  selector: 'app-gestion-info-personal',
  templateUrl: './gestion-info-personal.component.html',
  styleUrls: ['./gestion-info-personal.component.css']
})
export class GestionInfoPersonalComponent {

  ciudades: string[];
  tipo_sangre: string[];

  archivos!: FileList;

  pacienteActualizadoDTO: ActualizarPacienteDTO;
  constructor() {
    this.pacienteActualizadoDTO = new ActualizarPacienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
    this.tipo_sangre = [];
    this.cargarTipoSangre();
  }

  public actualizar() {
    if (this.archivos != null && this.archivos.length > 0) {
      console.log(this.pacienteActualizadoDTO);
    } else {
      console.log("Debe cargar una foto");
    }
  }

  private cargarCiudades() {
    this.ciudades.push("Armenia");
    this.ciudades.push("Calarcá");
    this.ciudades.push("Pereira");
    this.ciudades.push("Manizales");
    this.ciudades.push("Medellín");
  }

  private cargarTipoSangre() {
    this.tipo_sangre.push("a+");
    this.tipo_sangre.push("b+");
    this.tipo_sangre.push("b-");
    this.tipo_sangre.push("ab+");
    this.tipo_sangre.push("o-");
  }


  public onFileChange(event: any) {

    if (event.target.files.length > 0) {
        this.archivos = event.target.files;
    }
  }
}
