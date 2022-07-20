import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
//import { ConsoleReporter } from 'jasmine';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  miPortfolio:any; //Variable que contendrá los datos traídos.

  constructor(private portfolioService: PortfolioService,
              private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data => {
      this.miPortfolio=data;
    });
  }

  /**
   * EDICION de Persona. 
   * Abre la ventana modal para edición de persona.
   * Por parámetro recibo todos los datos que se están mostrando
   * en la página, para cargarselos en el formulario al usuario.
   **/
   openEditarPersona(idPersona: number, 
                     lugar: String,
                     direccion: String,
                     titulo: String,
                     nombre: String,
                     apellido: String,
                     fechaDeNacimiento: String,
                     nacionalidad: String,
                     estadoCivil: String,
                     cp: String,
                     celular: String,
                     mail: String,
                     aniosDeTrabajo: String,
                     cantidadDeProyectos: String,
                     ubicacion: String){
      
                      
      //Obtengo la ventana de dialogo y el formulario.
      let myDialog:any = <any>document.getElementById("personaDialog");
      let myForm:any = <any>document.getElementById("personaForm");

      //Abro la ventana de diálogo para que la vea el usuario.
      myDialog.showModal();

      //Cargo en el formulario los valores recibidos.
      myForm.idPersona.value = idPersona;                                  
      myForm.lugar.value = lugar;                      
      myForm.direccion.value = direccion;                          
      myForm.titulo.value = titulo;
      myForm.nombre.value = nombre;   
      myForm.apellido.value = apellido;   
      myForm.fechaDeNacimiento.value = fechaDeNacimiento;   
      myForm.nacionalidad.value = nacionalidad;   
      myForm.estadoCivil.value = estadoCivil;   
      myForm.cp.value = cp;     
      myForm.celular.value = celular;   
      myForm.mail.value = mail;   
      myForm.aniosDeTrabajo.value = aniosDeTrabajo;   
      myForm.cantidadDeProyectos.value = cantidadDeProyectos;   
      myForm.ubicacion.value = ubicacion;   
    }

    
  /** 
   *  EDICION de Persona.
   *  Edita una perosna con 
   *  los datos ingresados por el usuario.
   *  Esta función es llamada desde el Dialog (botón Enviar del form).
   **/
  onClickSubmit() {
    //Obtengo los datos del formulario y armo el JSON con ellos.
    let myForm:any = <any>document.getElementById("personaForm");   
    var jsonAenviar: String = JSON.stringify({id:myForm.idPersona.value,  
                                              nombre:myForm.nombre.value, 
                                              apellido:myForm.apellido.value, 
                                              fechaDeNacimiento:myForm.fechaDeNacimiento.value,
                                              lugar:myForm.lugar.value,
                                              direccion:myForm.direccion.value,
                                              nacionalidad:myForm.nacionalidad.value,
                                              estadoCivil:myForm.estadoCivil.value,
                                              cp:myForm.cp.value,
                                              celular:myForm.celular.value,
                                              mail:myForm.mail.value,
                                              aniosDeTrabajo:myForm.aniosDeTrabajo.value,
                                              cantidadDeProyectos:myForm.cantidadDeProyectos.value,
                                              ubicacion:myForm.ubicacion.value,
                                              titulo:myForm.titulo.value});
            

    //Obtengo la ventana Dialog y le digo que se cierre.
    let myDialog:any = <any>document.getElementById("personaDialog");
    myDialog.close();

    //Invoco al servicio de salvado de Persona.
    this.portfolioService.salvarPersona(jsonAenviar).subscribe();

    //Refresco la componente.
    window.location.reload();
    
  }

  //Devuelve true si el usuario esta logueado, false si no lo esta
  usuarioLogueado():boolean{
    return this.autenticacionService.usuarioLogueado();
  }

  //Abre la ventana log in
  openMyDialog() {
    let myDialog:any = document.getElementById("habiDialog");
    let myForm:any = <any>document.getElementById("habilidadForm");   
    myForm.reset();    
    myDialog.showModal();
  }


}