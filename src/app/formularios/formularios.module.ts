import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaFormularioAspiranteProveedorTecnologicoComponent } from './paginas/pagina-formulario-aspirante-proveedor-tecnologico/pagina-formulario-aspirante-proveedor-tecnologico.component';
import { TemplatesModule } from '../templates/templates.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PaginaFormularioAspiranteProveedorTecnologicoComponent
  ],
  imports: [
    CommonModule,
    TemplatesModule,
    NgbModule
  ]
})
export class FormulariosModule { }
