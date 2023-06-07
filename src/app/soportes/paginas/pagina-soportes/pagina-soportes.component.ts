import { Component, OnInit } from '@angular/core';
import { SoportesService } from '../../servicios/soportes.service';
import { Soporte } from '../../modelos/Soporte';
import { FiltrosSoportes } from '../../FiltrosSoportes';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagina-soportes',
  templateUrl: './pagina-soportes.component.html',
  styleUrls: ['./pagina-soportes.component.css']
})
export class PaginaSoportesComponent implements OnInit {
  formulario: FormGroup
  paginador: Paginador<FiltrosSoportes> 
  soportes: Soporte[] = []
  problemasAcceso?: boolean

  constructor(private servicioSoportes: SoportesService, private router: Router, private activatedRoute: ActivatedRoute){
    this.formulario = this.construirFormulario()
    this.paginador = new Paginador<FiltrosSoportes>(this.obtenerSoportes)
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (query)=>{
        this.problemasAcceso = query['acceso'] === 'true' ? true : false 
        this.paginador.inicializar(undefined, undefined, {
          problemaAcceso: this.problemasAcceso
        })
      }
    })
  }

  obtenerSoportes = (pagina: number, limite: number, filtros?: FiltrosSoportes) => {
    return new Observable<Paginacion>((subscriptor)=>{
      this.servicioSoportes.obtenerSoportes(pagina, limite, filtros ?? {}).subscribe({
        next: ( resultado )=>{
          this.soportes = resultado.datos
          subscriptor.next(resultado.paginacion)
        }
      })
    })
  }

  irAResponderSoporte(soporte: Soporte){
    this.servicioSoportes.guardarEnLocalStorage(soporte)
    this.router.navigate(['/administrar', 'responder-soporte', soporte.id])
  }

  construirFormulario(){
    return new FormGroup({
      termino: new FormControl<string>(""),
      estado: new FormControl<number>(1)
    })
  }

  cambiarFiltros(){
    this.paginador.inicializar(undefined, undefined, {
      estado: this.formulario.get('estado')!.value,
      termino: this.formulario.get('termino')!.value,
      problemaAcceso: this.problemasAcceso
    })
  }
}
