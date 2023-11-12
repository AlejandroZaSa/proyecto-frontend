import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleFacturaDTO } from 'src/app/modelo/medico/DetalleFacturaDTO';
import { MedicoService } from 'src/app/servicios/medico.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent {

  alerta!:Alerta
  facturaDetalle:DetalleFacturaDTO;
  constructor(private medicoService: MedicoService){
    this.facturaDetalle = new DetalleFacturaDTO;
  }

  public obtenerFactura(){

    let codigoConsulta = 0;

    this.medicoService.mostrarDetalleFactura(codigoConsulta).subscribe({
      next: data => {
        this.facturaDetalle = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
