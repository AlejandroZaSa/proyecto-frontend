import { Component } from '@angular/core';
import { ItemPQRSDTO } from 'src/app/modelo/ItemPQRSDTO';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-pqrs-admin',
  templateUrl: './pqrs-admin.component.html',
  styleUrls: ['./pqrs-admin.component.css']
})
export class PqrsAdminComponent {
  pqrs: ItemPQRSDTO[];
  constructor(private pqrsService: PqrsService) {
    this.pqrs = pqrsService.listar();
  }
}
