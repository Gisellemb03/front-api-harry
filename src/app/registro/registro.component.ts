import { Component, OnInit } from '@angular/core';
import { harryApi } from '../harryApi';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  nombre: string ="";
  casa: string ="";
  tipo: string ="";
  edad: string ="";
  imagen: string ="";
  goals:harryApi[]=[];
  constructor(private _data: ServiceService) { }

  ngOnInit(): void {
  }
  AgregarMeta(){

    var payload = {
      name : this.nombre,
      email : this.casa,
      age: this.edad,
      comments: this.tipo,
      imagen: "nada.jpg"
    }

    this._data.newGoal(payload)
    .subscribe((data: any) => {

      this.goals.push(payload);
      this.nombre='';
      this.casa='';
      this.edad='';
      this.tipo='';
      this.imagen='';

      this._data.changeGoal(this.goals);

   });
  }


}
