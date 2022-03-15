import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  // providedIn implica que el servicio funciona en toda la aplicacion
  providedIn: 'root'
})
export class GifsService {
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs'
  private apiKey      : string = 'VNXXyNfetu7k6HfUJXyNZT9J1OiEZCLg';
  private limit       : number = 12;
  private _historial: string[] = [];
  public resultados: Gif[]= [];

  get historial() {
    return [...this._historial];
  }
  constructor( private http: HttpClient){

    // Lugar idela para cargar del local storage.pues solo se ejecuta una unica vez HERE

    // Recojo la variable local del localStorage y la desserializo a un objeto javascript del tipo _historial. 
    // con ! fuerzo a leerlo si es nulo , con el or si es vacio devuelvo []
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //IDEM:
    // if (localStorage.getItem('historial') ){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)};

    this.resultados= JSON.parse(localStorage.getItem('resultados')!) || [];

    }
    
  buscarGifs ( valor: string ){

    // ***** HISTORIAL *
    // 1. lo paso a minuscula
    // 2. includes ,  verifica si el valor esta ya en la lista
    // 3. lo meto al Inicio y lo corto a 10 elementos. 
    // 4. Almaceno resultados en  LocalStorage. utilizo la propiedad stringify del JSON para serializar el array
    valor = valor.trim().toLowerCase();
    if(!this._historial.includes(valor)) {
      this._historial.unshift(valor);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }


    // ***** BUSQUEDA *****
    
    // Parametrizar la peticion:

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', valor );

    

    // Parametrizar la peticion

    // observables es del interface SerchGifsResponse
    // Tipeo la busqueda al tipo <SerchGifsResponse>
    this.http.get<SerchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
    //this.http.get<SerchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=VNXXyNfetu7k6HfUJXyNZT9J1OiEZCLg&q=${ valor }&limit=10`)
    .subscribe(resp => {
      console.log( resp.data );
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
    console.log(this._historial);
  }
}