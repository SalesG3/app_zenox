import { Component } from '@angular/core';
import { Reports } from '../session/reports/reports';

@Component({
  selector: 'app-documentos',
  imports: [Reports],
  template: `
  <app-reports
  title="Documentos/Recibos"
  type='documento'
  [dataReports]="dataReports"
  ></app-reports>
  `,
  styles: ``,
})
export class Documentos {

  dataReports: any[] = [
    
    {
      ID: "1", DS: "Ordem de Serviço", table: "MOVIMENTACOES",
      filters: [
        {
          label: "Ordem de Serviço",
          type: "lookup",
          field: "ID_MOVIMENTACAO",
          width: 12,
          lookup: { 
            table: "MOVIMENTACOES",
            ID: "ID_MOVIMENTACAO",
            DS: ["DT_MOVIMENTACAO"],
            where: "TP_MOVIMENTACAO = 'O'",
            order: ["DT_MOVIMENTACAO"]
          }
        }
      ],
      columns: [
        
      ],
    }
  ]
}
