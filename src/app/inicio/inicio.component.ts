import { Component, OnInit } from '@angular/core';
import { harryApi } from '../harryApi';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  itemCount: number=0;
  goals:harryApi[]=[];
  constructor(private _data: ServiceService) { }

  ngOnInit(): void {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res=> this.goals = res);
    this._data.changeGoal(this.goals);
    console.log(this.goals[0])
    this._data.getGoals()
     .subscribe((data: any) => {
      JSON.stringify(data.users);

      this.goals = data.users;
      this._data.changeGoal(this.goals);

    });
  }

}
