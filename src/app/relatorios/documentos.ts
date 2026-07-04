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
        { field: "ID_MOVIMENTACAO", label: "Ordem de Serviço", value: "" }
      ],
      columns: [
        
      ],
    }
  ]
}
