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
    },
    {
      ID: "3", DS: "Fluxo de Caixa - Agrupado Dia", report: "relatorio_fluxo_caixa",
      filters: [
        {
          label: "Mês",
          type: "select",
          field: "MES",
          options: [
            { ID: '1', DS: '01 - Janeiro' },
            { ID: '2', DS: '02 - Fevereiro' },
            { ID: '3', DS: '03 - Março' },
            { ID: '4', DS: '04 - Abril' },
            { ID: '5', DS: '05 - Maio' },
            { ID: '6', DS: '06 - Junho' },
            { ID: '7', DS: '07 - Julho' },
            { ID: '8', DS: '08 - Agosto' },
            { ID: '9', DS: '09 - Setembro' },
            { ID: '10', DS: '10 - Outubro' },
            { ID: '11', DS: '11 - Novembro' },
            { ID: '12', DS: '12 - Dezembro' }
          ]
        },
        {
          label: "Ano",
          field: "ANO",
          type: "select",
          options: [{ID: "2026", DS: "2026"}]
        }
      ],
      dataRow: {
        
      }
    }
  ]
}
