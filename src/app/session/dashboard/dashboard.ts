import { Component } from '@angular/core';
import { Default } from '../../widgets/default/default';
import { columnsGrid } from '../engine/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Default, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  widgets: any[] = [

    {
      title: "Valores a Receber (Por Credor)",
      table: "FINANCEIRO",
      totalizar: "VL_FINANCEIRO",

      columnsGrid: [
        {
          name: "Credor",
          field: "ID_PESSOA",
          width: 5
        },
        {
          name: "Valor",
          field: "VL_FINANCEIRO",
          width: 3
        }
      ]
    }
  ]
}
