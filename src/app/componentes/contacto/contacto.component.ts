import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  miPortfolio:any; //Variable que contendrá los datos traídos.

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data => {
      this.miPortfolio=data;
    });
  }

/** 
   *  POST de Contacto.
   *  Crea un Contacto con los datos cargados por el usuario.
   *  Esta función es llamada desde el Form de la página principal.
   **/
 onClickSubmit() {
    //Obtengo los datos del formulario y armo el JSON con ellos.
    let myForm:any = <any>document.getElementById("contactoForm"); 

    var jsonAenviar: String = JSON.stringify({nombre:myForm.nombre.value,
                                              email:myForm.email.value,
                                              asunto:myForm.asunto.value,
                                              mensaje:myForm.mensaje.value}); 
                                              

    //Invoco al servicio de salvado de Contacto.
    this.portfolioService.salvarContacto(jsonAenviar).subscribe();

    //Aviso al usuario el éxito de la operación.
    alert("He recibido su consulta. Gracias por su interés, le responderé a la brevedad");

    //Refresco la componente. 
    window.location.reload();
  }

}
