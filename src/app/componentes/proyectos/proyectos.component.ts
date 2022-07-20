import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

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

  /** Abre el Dialog que muestra el formulario de edición de Trabajo. */
  openMyDialog() {
    let myDialog:any = <any>document.getElementById("trabajoDialog");
    let myForm:any = <any>document.getElementById("trabajoForm");   
    myForm.reset();
    myDialog.showModal();
  }


  /** 
   *  EDICION de trabajo.
   *  Edita un trabajo (según se provea un id o no) con 
   *  los datos ingresados por el usuario.
   *  Esta función es llamada desde el Dialog (botón Enviar del form).
   **/
  onClickSubmit() {
    //Obtengo los datos del formulario y armo el JSON con ellos.
    let myForm:any = <any>document.getElementById("trabajoForm");   
    var jsonAenviar: String = JSON.stringify({id:myForm.idTrabajo.value,                                       
                                              titulo:myForm.titulo.value});

    //Obtengo la ventana Dialog y le digo que se cierre.
    let myDialog:any = <any>document.getElementById("trabajoDialog");
    myDialog.close();

    //Invoco al servicio de salvado de Trabajo.
    this.portfolioService.salvarTrabajo(jsonAenviar).subscribe();

    //Refresco la componente.
    window.location.reload();
    
  }

  
  /**
   * EDICION de Trabajo. 
   * Abre la ventana modal para edición de trabajo.
   * Por parámetro recibo todos los datos que se están mostrando
   * en la página, para cargarselos en el formulario al usuario.
   **/
  openEditarTrabajo(idTrabajo: number, 
                    titulo: String){

    //Obtengo la ventana de dialogo y el formulario.
    let myDialog:any = <any>document.getElementById("trabajoDialog");
    let myForm:any = <any>document.getElementById("trabajoForm");

    //Abro la ventana de diálogo para que la vea el usuario.
    myDialog.showModal();

    //Cargo en el formulario los valores recibidos.
    myForm.idTrabajo.value = idTrabajo;                                                      
    myForm.titulo.value = titulo;                          
  }

}
