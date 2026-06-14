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
      ID: "1", DS: "Listagem - Credores / Fornecedores", table: "PESSOAS",
      filters: [
        { field: "SN_ATIVO", label: "Ativo", value: "S" }
      ],
      columns: [
        { field: "CD_PESSOA", label: "Código", width: 4},
        { field: "NM_PESSOA", label: "Nome/Razão Social", width: 12},
        { field: "CADASTRO", label: "CPF/CNPJ", width: 4},
        { field: "SN_ATIVO", label: "Ativo", width: 4}
      ],
    },
    {
      ID: "2", DS: "Listagem - Categorias", table: "CATEGORIAS",
      filters: [
        { field: "SN_ATIVO", label: "Ativo", value: "S" }
      ],
      columns: [
        { field: "CD_CATEGORIA", label: "Código", width: 4},
        { field: "NM_CATEGORIA", label: "Categoria", width: 12},
        { field: "TP_CATEGORIA", label: "Tipo", width: 4},
        { field: "SN_ATIVO", label: "Ativo", width: 4}
      ],
    }
  ]
}
