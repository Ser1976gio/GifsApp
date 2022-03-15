import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get historial(){
    return this.gifService.historial;
  }
 
  constructor(private gifService: GifsService) {   }

  LoadImage(item : string){
    console.log("recargar imagen", item);
    this.gifService.buscarGifs(item);
  }   

  
}
