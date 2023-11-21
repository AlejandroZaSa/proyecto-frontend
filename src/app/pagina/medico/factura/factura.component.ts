import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  inputDeshabilitado=true
  facturaDetalle:DetalleFacturaDTO;
  codconsulta:number=0
  constructor(private route: ActivatedRoute,private medicoService: MedicoService){
    this.facturaDetalle = new DetalleFacturaDTO;
    
    this.route.params.subscribe(params => {
      this.codconsulta = parseInt(params['codigoConsulta']);
    });

    this.obtenerFactura();

  }

  public obtenerFactura(){

    console.log(this.codconsulta)
    this.medicoService.mostrarDetalleFactura(this.codconsulta).subscribe({
      next: data => {
        this.facturaDetalle = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
