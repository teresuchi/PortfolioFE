import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  miPortfolio:any; //Variable que contendrá los datos traídos.

  constructor(private portfolioService: PortfolioService,
              private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data => {
      this.miPortfolio=data;
    });
  }

  //Devuelve true si el usuario esta logueado, false si no lo está.
  usuarioLogueado():boolean{
    return this.autenticacionService.usuarioLogueado();
  }
  /** Abre el Dialog que muestra el formulario de edición de Servicio. */
  openMyDialog() {
    let myDialog:any = <any>document.getElementById("servicioDialog");
    let myForm:any = <any>document.getElementById("servicioForm");   
    myForm.reset();
    myDialog.showModal();
  }


  /** 
   *  EDICION de Servicio.
   *  Edita un servicio (según se provea un id o no) con 
   *  los datos ingresados por el usuario.
   *  Esta función es llamada desde el Dialog (botón Enviar del form).
   **/
  onClickSubmit() {
    //Obtengo los datos del formulario y armo el JSON con ellos.
    let myForm:any = <any>document.getElementById("servicioForm");   
    var jsonAenviar: String = JSON.stringify({id:myForm.idServicio.value,                                       
                                              descripcion:myForm.descripcion.value,
                                              titulo:myForm.titulo.value});

    //Obtengo la ventana Dialog y le digo que se cierre.
    let myDialog:any = <any>document.getElementById("servicioDialog");
    myDialog.close();

    //Invoco al servicio de salvado de Servicio.
    this.portfolioService.salvarServicio(jsonAenviar).subscribe();

    //Refresco la componente.
    window.location.reload();
    
  }

  
  /**
   * EDICION de Servicio. 
   * Abre la ventana modal para edición de servicio.
   * Por parámetro recibo todos los datos que se están mostrando
   * en la página, para cargarselos en el formulario al usuario.
   **/
  openEditarServicio(idServicio: number, 
                    descripcion: String, 
                    titulo: String){

    //Obtengo la ventana de dialogo y el formulario.
    let myDialog:any = <any>document.getElementById("servicioDialog");
    let myForm:any = <any>document.getElementById("servicioForm");

    //Abro la ventana de diálogo para que la vea el usuario.
    myDialog.showModal();

    //Cargo en el formulario los valores recibidos.
    myForm.idServicio.value = idServicio;                                  
    myForm.descripcion.value = descripcion;                      
    myForm.titulo.value = titulo;                          
  }
  
}

