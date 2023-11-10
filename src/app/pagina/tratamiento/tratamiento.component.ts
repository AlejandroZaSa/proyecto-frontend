import { Component } from '@angular/core';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent {

  textoIngresado: string = '';

  imprimirEnConsola() {
    console.log('Texto ingresado:', this.textoIngresado);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    console.log('Texto actual en el input:', valor);
  }
}
