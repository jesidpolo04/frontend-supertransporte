import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pregunta } from 'src/app/encuestas/modelos/EncuestaCuantitativa';
import { Respuesta } from 'src/app/encuestas/modelos/Respuesta';

@Component({
  selector: 'app-pregunta-encuesta-cuantitativa',
  templateUrl: './pregunta-encuesta-cuantitativa.component.html',
  styleUrls: ['./pregunta-encuesta-cuantitativa.component.css']
})
export class PreguntaEncuestaCuantitativaComponent implements OnInit {
  @Input('pregunta') pregunta!: Pregunta
  @Input('soloLectura') soloLectura: boolean = false
  @Input() habilitarCamposVigilado: boolean = true
  @Input() habilitarCamposVerificador: boolean = false
  @Output('cambio') cambio: EventEmitter<Respuesta>
  valor: number = 0;

  constructor(){
    this.cambio = new EventEmitter<Respuesta>();
  }
  
  ngOnInit(): void {
    this.setValor(Number(this.pregunta.respuesta), false)
  }

  manejarCambio(valor: number){
    this.setValor(valor)
  }

  setValor(valor: number, emitirEvento: boolean = true){
    this.valor = valor
    if(emitirEvento) this.cambio.emit({
      preguntaId: this.pregunta.idPregunta,
      valor: this.valor.toString()
    });
  }
}
