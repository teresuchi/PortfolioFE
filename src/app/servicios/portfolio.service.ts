import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }


  /** GET: invoca al GET de Portfolio del Backend. */
  obtenerDatos():Observable<any>{  
    //return this.http.get('./assets/data/data.json');   
    //return this.http.get<any>('https://localhost:8080/portfolio');        
    return this.http.get<any>('https://rocky-falls-56185.herokuapp.com/portfolio');        
  }


  /** POST: invoca al POST de Persona del Backend. */
  crearPersona(jsonAenviar: String): Observable<any> {
    //const urlServicio = 'https://localhost:8080/personas/crear';
    const urlServicio = 'https://rocky-falls-56185.herokuapp.com/personas/crear';    
    const body = jsonAenviar;
    const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'//,
              //Authorization: 'my-auth-token'
            })
    };

    return this.http.post<any>(urlServicio, body, httpOptions);
  }



/** 
 *  POST: invoca al POST de Contacto del Backend. 
 */

 salvarContacto(jsonAenviar: String): Observable<any> {
 // const urlContacto = 'https://localhost:8080/contacto/salvar';
  const urlContacto = 'https://rocky-falls-56185.herokuapp.com/contacto/salvar'; 
  const body = jsonAenviar;
  const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'//,
            //Authorization: 'my-auth-token'
          })
  };

  return this.http.post<any>(urlContacto, body, httpOptions);
}


/** PUT: invoca al PUT de Estudio del Backend. 
 *  Si id es null, cumple la función de POST.
 */
salvarEstudio(jsonAenviar: String): Observable<any> {
  //const urlServicio = 'https://localhost:8080/estudio/salvar';
  const urlServicio = 'https://rocky-falls-56185.herokuapp.com/estudio/salvar';  
  const body = jsonAenviar;
  const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'//,
            //Authorization: 'my-auth-token'
          })
  };

  return this.http.put<any>(urlServicio, body, httpOptions);
}


/** DELETE: invoca al Delete de Estudio del Backend. */
borrarEstudio(idEstudio: number): Observable<any> {
  //const urlServicio = 'https://localhost:8080/estudio/borrar/';
  const urlServicio = 'https://rocky-falls-56185.herokuapp.com/estudio/borrar/';  
  return this.http.delete<any>(urlServicio + idEstudio);
}


/** 
 *  PUT: invoca al PUT de Habilidad del Backend. 
 *  Si id es null, cumple la función de POST.
 */

salvarHabilidad(jsonAenviar: String): Observable<any> {
  //const urlServicio = 'https://localhost:8080/habilidad/salvar';
  const urlServicio = 'https://rocky-falls-56185.herokuapp.com/habilidad/salvar';  
  const body = jsonAenviar;
  const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'//,
            //Authorization: 'my-auth-token'
          })
  };

  return this.http.put<any>(urlServicio, body, httpOptions);
}


/** DELETE: invoca al Delete de Habilidad del Backend. */
borrarHabilidad(idHabilidad: number): Observable<any> {
//  const urlServicio = 'https://localhost:8080/habilidad/borrar/';
  const urlServicio = 'https://rocky-falls-56185.herokuapp.com/habilidad/borrar/';
  return this.http.delete<any>(urlServicio + idHabilidad);
}


/** 
 *  PUT: invoca al PUT de Servicio del Backend. 
 *  Si id es null, cumple la función de POST.
 */

 salvarServicio(jsonAenviar: String): Observable<any> {
  const urlServicio = 'https://rocky-falls-56185.herokuapp.com/servicio/salvar';
  const body = jsonAenviar;
  const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'//,
            //Authorization: 'my-auth-token'
          })
  };

  return this.http.put<any>(urlServicio, body, httpOptions);
}




/** 
 *  PUT: invoca al PUT de Persona del Backend. 
 */

 salvarPersona(jsonAenviar: String): Observable<any> {
  const urlPersona = 'https://rocky-falls-56185.herokuapp.com/persona/salvar';
  const body = jsonAenviar;
  const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'//,
            //Authorization: 'my-auth-token'
          })
  };

  return this.http.put<any>(urlPersona, body, httpOptions);
}


/** 
 *  PUT: invoca al PUT de Trabajo del Backend. 
 *  Si id es null, cumple la función de POST.
 */

 salvarTrabajo(jsonAenviar: String): Observable<any> {
  const urlTrabajo = 'https://rocky-falls-56185.herokuapp.com/trabajo/salvar';
  const body = jsonAenviar;
  const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'//,
            //Authorization: 'my-auth-token'
          })
  };

  return this.http.put<any>(urlTrabajo, body, httpOptions);
}

}
