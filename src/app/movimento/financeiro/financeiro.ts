import { Component } from '@angular/core';
import { Engine } from '../../session/engine/engine';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../../session/engine/interfaces';

@Component({
  selector: 'app-financeiro',
  imports: [Engine],
  template: `
    <app-engine
      compTitle="Controle Financeiro"
      dataKey="ID_FINANCEIRO"
      table="FINANCEIRO"
      
      [dataRow]="dataRow"
      [columnsGrid]="columnsGrid"
      [dataForm]="dataForm"
      [formFilter]="formFilter"

      [dataSub]="dataSub"
      [subComponent]="subComponent"
    ></app-engine>`,
  styles: ``,
})
export class Financeiro {

  dataRow: dataRow = {
    ID_FINANCEIRO: '',
    CD_FINANCEIRO: '',
    DT_FINANCEIRO: '',
    TP_FINANCEIRO: '',
    DS_FINANCEIRO: '',
    ID_PESSOA: '',
    NU_DOCUMENTO: '',
    VL_FINANCEIRO: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "FINANCEIRO_PARCELA": {
      CD_FINANCEIRO_PARCELA: '',
      DT_FINANCEIRO_PARCELA: '',
      VL_FINANCEIRO_PARCELA: '',
      DT_PAGAMENTO: '',
      NU_DOCUMENTO: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Data",
      field: "DT_FINANCEIRO",
      width: 12,
      type: "date"
    },
    {
      name: "Tipo",
      field: "TP_FINANCEIRO",
      width: 12,
      type: "select",
      options: {"D":"Despesa", "R":"Receita"}
    },
    {
      name: "Descrição",
      field: "DS_FINANCEIRO",
      width: 30
    },
    {
      name: "Cliente/Fornecedor",
      field: "ID_PESSOA",
      width: 30,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Valor",
      field: "VL_FINANCEIRO",
      width: 16,
      type: "currency"
    }
  ]

  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_FINANCEIRO",
        width: 12,
        required: true,
        autocomplete: { type: "codigo" }
      },
      {
        label: "Data",
        type: "date",
        field: "DT_FINANCEIRO",
        width: 12,
        required: true,
        autocomplete: { type: "today" }
      },
      {
        label: "Descrição",
        type: "text",
        field: "DS_FINANCEIRO",
        width: 45,
        required: true
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_FINANCEIRO",
        width: 16,
        options: [{ID: "D", DS: "Despesa"},{ID: "R", DS: "Receita"}],
        required: true
      },
      {
        label: "Num. Documento",
        type: "text",
        field: "NU_DOCUMENTO",
        width: 16
      },
      {
        label: "Cliente/Fornecedor",
        type: "lookup",
        field: "ID_PESSOA",
        width: 30,
        lookup: "PESSOAS",
        required: true
      },
      {
        label: "Valor",
        type: "currency",
        field: "VL_FINANCEIRO",
        width: 12,
        required: true
      },
      {
        label: "Histórico",
        type: "textarea",
        field: "HISTORICO",
        width: 100
      },
      {
        label: "Parcelas",
        type: "subComponent",
        field: "FINANCEIRO_PARCELA",
        width: 50,
        height: 15
      }
    ],
    tabs: []
  }

  subComponent: subComponent = {
    "FINANCEIRO_PARCELA": {
      subKey: "ID_FINANCEIRO_PARCELA",
      subColumns: [
        {
          name: "Código",
          field: "CD_FINANCEIRO_PARCELA",
          width: 14
        },
        {
          name: "Vencimento",
          field: "DT_FINANCEIRO_PARCELA",
          width: 14,
          type: "date"
        },
        {
          name: "Pagto",
          field: "DT_PAGAMENTO",
          width: 14,
          type: "date"
        },
        {
          name: "Valor",
          field: "VL_FINANCEIRO_PARCELA",
          width: 14,
          type: "currency"
        }
      ],

      subForm: [
        {
          label: "Código",
          type: "number",
          field: "CD_FINANCEIRO_PARCELA",
          width: 16,
          required: true,
          autocomplete: { type: "codigo" }
        },
        {
          label: "Vencimento",
          type: "date",
          field: "DT_FINANCEIRO_PARCELA",
          width: 20,
          required: true
        },
        {
          label: "Valor",
          type: "currency",
          field: "VL_FINANCEIRO_PARCELA",
          width: 20,
          required: true
        },
        {
          label: "Pagamento",
          type: "date",
          field: "DT_PAGAMENTO",
          width: 20
        },
        {
          label: "Num. Doc",
          type: "text",
          field: "NU_DOCUMENTO",
          width: 35
        }
      ]
    }
  }

  formFilter: dataForm[] = []
}
