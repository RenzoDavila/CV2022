import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {}

  static downloadFile(languaje: string){
    const url = (window.location.href).replace('#/', ''); //obteniendo url

     //creando una etiqueta <a></a> y agregandole caracteristicas
    const downloadInstance = document.createElement('a');
    downloadInstance.href = `${url}assets/docs/RenzoDavila-${languaje}.pdf`;
    downloadInstance.target = '_blank';
    downloadInstance.download = `RenzoDavilaCV-${languaje}`;

     //agregando al body danod click y quitando del body
    document.body.appendChild(downloadInstance);
    downloadInstance.click();
    document.body.appendChild(downloadInstance);
  }
}
