import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workspace } from '../../services/workspace';
import { Venda } from '../../movimento/venda/venda';
import { EngineService } from '../../services/engine-service';
import { Estoque } from '../../movimento/estoque/estoque';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(public workspace: Workspace, private service: EngineService){ }

  novaVenda(){
    let item = { label: "Venda", route: "venda", icon: "fa-solid fa-gears", component: Venda}
    this.service.startFunction = 'incluir'
    this.workspace.openComponent(item)
  }

  novaEntrada(){
    let item = { label: "Estoque", route: "estoque", icon: "fa-solid fa-boxes-packing", component: Estoque}
    this.service.startFunction = 'incluir'
    this.workspace.openComponent(item)
  }

}
