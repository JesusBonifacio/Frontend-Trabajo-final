import { Component } from '@angular/core';
import { Partida } from '../../models/partida';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username="Pogolord";
  numero_suerte=0;
  numero_computadora=0;
  numero_victorias=0;
  numero_empates=0;
  numero_derrotas=0;
  historial_partidas:Partida[]=[];
  ganador=-1;

  constructor(){    
  }


  cambiarNumeroSuerte(){
    this.numero_suerte = Math.trunc(Math.random()*10)+1; 
    this.numero_computadora = Math.trunc(Math.random()*10)+1; 
    let resultado=0;
    if (this.numero_suerte>this.numero_computadora) {
      this.numero_victorias++;
      resultado=1;
    } else {
      if (this.numero_suerte==this.numero_computadora) {
        this.numero_empates++;
        resultado=0;
      } else {
        this.numero_derrotas++;
        resultado=2;
      }      
    }

    const partida_actual={
      numero_jugador1:this.numero_suerte,
      numero_jugador2:this.numero_computadora,
      resultado:resultado
    }

    this.historial_partidas.push(partida_actual);

    if ((this.numero_victorias+this.numero_derrotas+this.numero_empates)==10){
      if (this.numero_victorias>this.numero_derrotas) {
        this.ganador = 1;
      } else {
        if (this.numero_victorias<this.numero_derrotas) {
          this.ganador = 2;
        } else {
          this.ganador=0;
        }
      }
      
      
    }

  }
 

  evaluaResultado(resultado:number){
    if (resultado==1) {
      return "Ganaste! :)";
    }
    if (resultado==2) {
      return "Perdiste! :(";
    }
    return "Empataste! :|";   
    
  }


}
