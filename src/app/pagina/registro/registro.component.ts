import { Component } from '@angular/core';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroPacienteDTO: RegistroPacienteDTO;
  ciudades: string[];
  tipo_sangre: string[];
  
  archivos!: FileList;

  constructor() {
    this.registroPacienteDTO = new RegistroPacienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
    this.tipo_sangre = [];
    this.cargarTipoSangre();
  
  }

  public registrar() {
    if (this.archivos != null && this.archivos.length > 0) {
      console.log(this.registroPacienteDTO);
    } else {
      console.log("Debe cargar una foto");
    }
  }

  public sonIguales(): boolean {
    return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
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
