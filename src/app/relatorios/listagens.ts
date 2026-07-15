import { Component } from '@angular/core';
import { Reports } from '../session/reports/reports';

@Component({
  selector: 'app-listagens',
  imports: [Reports],
  template: `
  <app-reports
  title="Relatórios de Listagem"
  type='listagem'
  [dataReports]="dataReports"
  ></app-reports>
  `,
  styles: ``,
})
export class Listagens {
  dataReports: any[] = [
    {
      ID: "1", DS: "Listagem - Credores / Fornecedores", report: "listagem_pessoas",
      filters: [
         {
          label: "Tipo",
          type: "select",
          field: "TP_PESSOA",
          width: 12,
          options: [{ID: "", DS: ""}, {ID: "F", DS: "Física"}, {ID: "J", DS: "Jurídica"}]
        },
        {
          label: "Ativo",
          type: "select",
          field: "SN_ATIVO",
          width: 12,
          options: [{ID: "1", DS: "Sim"}, {ID: "0", DS: "Não"}]
        },
      ],
      dataRow: {
        TP_PESSOA: '',
        SN_ATIVO: 1,

      }
    },
    {
      ID: "2", DS: "Listagem - Categorias", report: "listagem_categorias",
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
