import { Component } from '@angular/core';
import { Reports } from '../session/reports/reports';

@Component({
  selector: 'app-documentos',
  imports: [Reports],
  template: `
  <app-reports
  title="Documentos/Recibos"
  [dataReports]="dataReports"
  ></app-reports>
  `,
  styles: ``,
})
export class Documentos {

  dataReports: any[] = [
    {
      ID: "1", DS: "Ordem de Serviço", report: "ordemservico",
      filters: [
        {
          label: "Ordem de Serviço",
          type: "lookup",
          field: "ID_MOVIMENTACAO",
          width: 12,
          lookup: "ORDEM_SERVICO"
        }
      ],
      dataRow: {
        ID_MOVIMENTACAO: ''
      }
    }
  ]
}
