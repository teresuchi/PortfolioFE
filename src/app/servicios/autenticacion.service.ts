import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AutenticacionService {
  url='http://localhost:8080/login';
  //currentUserSubject: BehaviorSubject<any>;

  constructor(private http:HttpClient) {
    console.log("El servicio de autenticacion está corriendo");
    //this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }

  IniciarSesion(jsonAenviar: String):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'//,
        //Authorization: 'my-auth-token'
      })
    };
    
    sessionStorage.setItem('currentUser',"Token");

    // ORIGINAL
    return this.http.post(this.url, jsonAenviar, httpOptions).pipe(map(data => {
      //Guardo en el Session Storage la data (token) que me devuelve la API.
      //Se guarda como clave/valor.
      //sessionStorage.setItem('currentUser',JSON.stringify(data));
      //this.currentUserSubject.next(data);

      return data;
    }))
    

    /* MÍO */
    //Devería hacerse LUEGO del llamado al post.
    //Guardo en el Session Storage la data (token) que me devuelve la API.
    //Se guarda como clave/valor.
    //sessionStorage.setItem('currentUser', "token");    
    //return this.http.post(this.url, jsonAenviar, httpOptions);
  }

  //Desloguea al usuario
  CerrarSesion(){
    sessionStorage.setItem('currentUser',"");
  }


  get UsuarioAutenticado(){
    return null;//this.currentUserSubject.value;
  }

  //Devuelve true si el usuario esta logueado, false si no lo esta
  //Es llamado desde todas las compoenentes.
  usuarioLogueado():boolean{
    return sessionStorage.getItem('currentUser') != "";
  }
}
