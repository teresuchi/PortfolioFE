import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {

  miPortfolio:any; //Variable que contendrá los datos traídos.

  constructor(private portfolioService: PortfolioService,
              private autenticacionService: AutenticacionService) {}

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data => {
      this.miPortfolio=data;
    });  
  }

  //Devuelve true si el usuario esta logueado, false si no lo está.
  usuarioLogueado():boolean{
    return this.autenticacionService.usuarioLogueado();
  }

  /** Abre el Dialog que muestra el formulario de alta de Educación. */
  openMyDialog() {
    let myDialog:any = <any>document.getElementById("educacionDialog");
    let myForm:any = <any>document.getElementById("educacionForm");   
    myForm.reset();
    myDialog.showModal();
  }


  /** 
   *  ALTA/EDICION de Estudio.
   *  Da de alta o edita un estudio (según se provea un id o no) con 
   *  los datos ingresados por el usuario.
   *  Esta función es llamada desde el Dialog (botón Enviar del form).
   **/
  onClickSubmit() {
    //Obtengo los datos del formulario y armo el JSON con ellos.
    let myForm:any = <any>document.getElementById("educacionForm");   
    var jsonAenviar: String = JSON.stringify({id:myForm.idEstudio.value,
                                              anio:myForm.anio.value,
                                              institucion:myForm.institucion.value,
                                              titulo:myForm.titulo.value});

    //Obtengo la ventana Dialog y le digo que se cierre.
    let myDialog:any = <any>document.getElementById("educacionDialog");
    myDialog.close();

    //Invoco al servicio de salvado de Estudio.
    this.portfolioService.salvarEstudio(jsonAenviar).subscribe();

    //Refresco la componente.
    window.location.reload();
    
  }

  
  /**
   * EDICION de Estudio. 
   * Abre la ventana modal para edición de estudio.
   * Por parámetro recibo todos los datos que se están mostrando
   * en la página, para cargarselos en el formulario al usuario.
   **/
  openEditarEstudio(idEstudio: number, anio: String, 
                    institucion: String, titulo: String){

    //Obtengo la ventana de dialogo y el formulario (los mismos que 
    //se usan para el alta de Estudio).
    let myDialog:any = <any>document.getElementById("educacionDialog");
    let myForm:any = <any>document.getElementById("educacionForm");

    //Abro la ventana de diálogo para que la vea el usuario.
    myDialog.showModal();

    //Cargo en el formulario los valores recibidos.
    myForm.idEstudio.value = idEstudio;                  
    myForm.anio.value = anio;                  
    myForm.institucion.value = institucion;                      
    myForm.titulo.value = titulo;                          
  }


  /**
  * DELETE de Estudio. 
  * Borra el Estudio cuyo id se recibe por parámetro.
  **/
  borrarEstudio(idEstudio:number){
    //Pido re-confirmación al usuario para borrar.
    if (confirm("¿Está seguro de borrar este ítem?") == true) {
        //Borro el estudio.
        this.portfolioService.borrarEstudio(idEstudio).subscribe();

        //Refresco la componente para actualizar lo que muestra.
        window.location.reload();
    }    
  }

}
