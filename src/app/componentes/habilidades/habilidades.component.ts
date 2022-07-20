import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

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

  /** Abre el Dialog que muestra el formulario de alta de Habilidad. */
  openMyDialog() {
    let myDialog:any = document.getElementById("habilidadDialog");
    let myForm:any = <any>document.getElementById("habilidadForm");   
    myForm.reset();    
    myDialog.showModal();
  }


  /** 
   *  ALTA/EDICION de Habilidad.
   *  Da de alta o edita una habilidad (según se provea un id o no) con 
   *  los datos ingresados por el usuario.
   *  Esta función es llamada desde el Dialog (botón Enviar del form).
   **/
   onClickSubmit() {
    //Obtengo los datos del formulario y armo el JSON con ellos.
    let myForm:any = <any>document.getElementById("habilidadForm");   
    var jsonAenviar: String = JSON.stringify({id:myForm.idHabilidad.value,
                                              titulo:myForm.titulo.value,
                                              porcentaje:myForm.porcentaje.value,
                                              disciplina:myForm.disciplina.value});

    //Obtengo la ventana Dialog y le digo que se cierre.
    let myDialog:any = <any>document.getElementById("habilidadDialog");
    myDialog.close();

    //Invoco al servicio de salvado de Habilidad.
    this.portfolioService.salvarHabilidad(jsonAenviar).subscribe();

    //Refresco la componente.
    window.location.reload();
  }
  
  /**
   * DELETE de habilidad. 
   * Borra la habilidad cuyo id se recibe por parámetro.
   **/
   borrarHabilidad(idHabilidad:number){
    //Pido re-confirmación al usuario para borrar.
    if (confirm("¿Está seguro de borrar este ítem?") == true) {
      
      //Borro la habilidad.
        this.portfolioService.borrarHabilidad(idHabilidad).subscribe();

        //Refresco la componente para actualizar lo que muestra.
        window.location.reload();
    }    
  }


  /**
   * EDICION de Habilidad. 
   * Abre la ventana modal para edición de Habilidad.
   * Por parámetro recibo todos los datos que se están mostrando
   * en la página, para cargarselos en el formulario al usuario.
   **/
 openEditarHabilidad(idHabilidad: number, 
                     titulo: String, 
                     porcentaje: String,
                     disciplina: String){

  //Obtengo la ventana de dialogo y el formulario (los mismos que 
  //se usan para el alta de Habilidad).
  let myDialog:any = <any>document.getElementById("habilidadDialog");
  let myForm:any = <any>document.getElementById("habilidadForm");

  //Abro la ventana de diálogo para que la vea el usuario.
  myDialog.showModal();

  //Cargo en el formulario los valores recibidos por parámetro
  //desde la parte html de la componente.
  myForm.idHabilidad.value = idHabilidad;                  
  myForm.titulo.value = titulo;                  
  myForm.porcentaje.value = porcentaje;
  myForm.disciplina.value = disciplina;                      
 }



}
