import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

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


 /** Abre el Dialog que muestra el formulario de login. */
 openMyDialog() {
  let myDialog:any = <any>document.getElementById("cabeceraDialog");
  let myForm:any = <any>document.getElementById("cabeceraForm");   
  myForm.reset();
  myDialog.showModal();
}

//Desloguea al usuario.
desloguear(){
  this.autenticacionService.CerrarSesion();
}


//Método que se llama cuando el usuario presiona "Enviar" 
//(habiendo ya cargado el usuario y password en el form)
onClickSubmit(){
    //Obtengo los datos del formulario y armo el JSON con ellos.
    let myForm:any = <any>document.getElementById("cabeceraForm");   
    var jsonAenviar: String = JSON.stringify({usuario:myForm.usuario.value,
                                              password:myForm.password.value});

    //Obtengo la ventana Dialog y le digo que se cierre.
    let myDialog:any = <any>document.getElementById("cabeceraDialog");
    myDialog.close();

    //Invoco al servicio de login.
    this.autenticacionService.IniciarSesion(jsonAenviar).subscribe();

    //Refresco la componente.
    window.location.reload();
    
    /*  ORIGINAL TAL CUAL EL VIDEO
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA: " + JSON.stringify(data));
      this.ruta.navigate(['/portfolio']);
    })    
    */

    //VERSION MIA.
    // No uso "this.form.value" xq no tengo forms reactivos. Entonces,
    // obtengo las credenciales a mano.
    /*
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA: " + JSON.stringify(data));
    })
    */

}


}
