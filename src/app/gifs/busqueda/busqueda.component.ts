import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  // ViewChield es la caja de texto (Input) del template  hacemos un tipado y con ! obligamos a leerla aun siendo null.
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  //injectamos el servicio.
  constructor( private gifsService: GifsService){}

  buscar(){
    //recojo el valor de la caja input 
    const valor = this.txtBuscar.nativeElement.value;
    // servicio para meter en una lista
    this.gifsService.buscarGifs(valor);
    // clear textbox 
    this.txtBuscar.nativeElement.value = '';

  }
  // buscar(event :KeyboardEvent){
  //   console.log(event);
  //}

}
