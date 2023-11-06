import { Injectable } from '@angular/core';
import { ItemPQRSDTO } from '../modelo/clinica/ItemPQRSDTO';
import { PQRSPacienteDTO } from '../modelo/paciente/PQRSPacienteDTO';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  pqrs: ItemPQRSDTO[];
  constructor() {
    this.pqrs = [];
    this.pqrs.push({
      codigoRadicacion: 1, detalle: 'Solicitud de información', fecha:
        '2023-10-12', estadoPqrs: 'ACTIVO'
    });
    this.pqrs.push({
      codigoRadicacion: 2, detalle: 'Solicitud de cambio de fecha',
      fecha: '2023-09-29', estadoPqrs: 'ACTIVO'
    });
    this.pqrs.push({
      codigoRadicacion: 3, detalle: 'Solicitud de información', fecha:
        '2023-11-01',  estadoPqrs: 'CERRADO'
    });
    this.pqrs.push({
      codigoRadicacion: 4,  detalle: 'Queja sobre médico', fecha:
        '2023-09-07', estadoPqrs: 'ACTIVO'
    });
  }
  public listar(): ItemPQRSDTO[] {
    return this.pqrs;
  }
  public obtener(codigo: number): ItemPQRSDTO | undefined {
    return this.pqrs.find(pqrs => pqrs.codigoRadicacion == codigo);
  }
  public crear(pqrs: PQRSPacienteDTO) {
    let codigo = this.pqrs.length + 1;
    this.pqrs.push({
      codigoRadicacion: codigo,  detalle: pqrs.motivo, fecha: new
        Date().toISOString(), estadoPqrs: 'ACTIVO'
    });
  }
}