import { Injectable } from '@angular/core';
import { ItemCitaPqrsPaciente } from '../modelo/paciente/ItemCitaPqrsPacienteDTO';
import { CitaDTO } from '../modelo/paciente/CitaDTO';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  cita: ItemCitaPqrsPaciente[];
  constructor() {
    this.cita = [];

    this.cita.push({
      idCita: 1, fecha: '2023-09-29'
    });

    this.cita.push({
      idCita: 2, fecha: '2023-10-11'
    });

  }

  public listar(): ItemCitaPqrsPaciente[] {
    return this.cita;
  }
  public obtener(codigo: number): ItemCitaPqrsPaciente | undefined {
    return this.cita.find(cita => cita.idCita == codigo);
  }
  public crear(cita: CitaDTO) {
    let codigo = this.cita.length + 1;
    this.cita.push({
      idCita: codigo, fecha: new Date().toISOString()
    });
  }
}
