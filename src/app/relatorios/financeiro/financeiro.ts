import { Component } from '@angular/core';
import { Reports } from '../../session/reports/reports';

@Component({
  selector: 'app-financeiro',
  imports: [Reports],
  template: `
  <app-reports
  title="Relatórios - Estoque"
  [dataReports]="dataReports"
  ></app-reports>
  `,
  styles: ``,
})
export class FinanceiroReport {
  dataReports: any[] = [
    {
      ID: "1", DS: "Contas a Pagar - Por Credor", report: "relatorio_contas_pagar",
      filters: [
      ],
      dataRow: {
        
      }
    },
    {
      ID: "2", DS: "Contas a Receber - Por Devedor", report: "relatorio_contas_receber",
      filters: [
      ],
      dataRow: {
        
      }
    }
  ]
}
