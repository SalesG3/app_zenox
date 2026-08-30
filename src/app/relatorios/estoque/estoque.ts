import { Component } from '@angular/core';
import { Reports } from '../../session/reports/reports';

@Component({
  selector: 'app-estoque',
  imports: [Reports],
  template: `
  <app-reports
  title="Relatórios - Estoque"
  [dataReports]="dataReports"
  ></app-reports>
  `,
  styles: ``,
})
export class EstoqueReport {

  dataReports: any[] = [
    {
      ID: "1", DS: "Saldo dos Produtos", report: "saldoprodutos",
      filters: [
        {
          label: "Ativo",
          type: "select",
          field: "SN_ATIVO",
          width: 12,
          options: [{ID: "1", DS: "Sim"}, {ID: "0", DS: "Não"}]
        }
      ],
      dataRow: {
        SN_ATIVO: 1
      }
    }
  ]
  
}
