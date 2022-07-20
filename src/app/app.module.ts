import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ProyectoMenteComponent } from './componentes/proyecto-mente/proyecto-mente.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { PieDePaginaComponent } from './componentes/pie-de-pagina/pie-de-pagina.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { PortfolioService } from './servicios/portfolio.service';
import { InterceptorService } from './servicios/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AcercaDeComponent,
    HabilidadesComponent,
    EducacionComponent,
    ServiciosComponent,
    ProyectoMenteComponent,
    ProyectosComponent,
    ContactoComponent,
    PieDePaginaComponent,
    CabeceraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  //Original:
  //providers: [],
  //Nuevo:
  providers: [PortfolioService,
              {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],

  
  bootstrap: [AppComponent]
})
export class AppModule { }
