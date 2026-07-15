import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-financeiro',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Movimentação Financeira"
    dataKey="ID_FINANCEIRO"
    table="FINANCEIRO"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"
    [formFilter]="formFilter"

  ></app-engine>
  `,
  styles: ``,
})
export class Financeiro {
  
  dataRow: dataRow = {
    ID_FINANCEIRO: 0,
    DT_FINANCEIRO: '',
    TP_FINANCEIRO: '',
    DS_FINANCEIRO: '',
    ID_CATEGORIA_DETALHE: '',
    CD_STATUS: '',
    ID_CONTRATO: '',
    ID_PESSOA: '',
    DOC_FINANCEIRO: '',
    VL_FINANCEIRO: '',
  }

  dataSub: dataSub = {
    "FINANCEIRO_DOCUMENTOS": {
      ID_FINANCEIRO_DOCUMENTO: 0,
      DT_DOCUMENTO: '',
      TP_DOCUMENTO: '',
      DS_DOCUMENTO: '',
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Data",
      field: "DT_FINANCEIRO",
      width: 6,
      type: 'date'
    },
    {
      name: "Tipo",
      field: "TP_FINANCEIRO",
      type: 'select',
      width: 6,
      options: {"D": "Despesa", "R": "Receita"}
    },
    {
      name: "Credor / Fornecedor",
      field: "ID_PESSOA",
      width: 24,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Descrição",
      field: "DS_FINANCEIRO",
      width: 24
    },
    {
      name: "Status",
      field: "CD_STATUS",
      width: 6,
      type: "select",
      options: {"L":"Liquidado","P":"Pago"}
    },
    {
      name: "Valor",
      field: "VL_FINANCEIRO",
      type: 'currency',
      width: 6
    }
  ]
  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_FINANCEIRO",
        width: 8,
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
        label: "Tipo",
        type: "select",
        field: "TP_FINANCEIRO",
        width: 12,
        required: true,

        options: [{ID: "D", DS: "Despesa"}, {ID: "R", DS: "Receita"}]
      },
      {
        label: "Descrição",
        type: "text",
        field: "DS_FINANCEIRO",
        width: 48,
        required: true
      },
      {
        label: "Categoria",
        type: "lookup",
        field: "ID_CATEGORIA_DETALHE",
        width: 20,
        lookup: "CATEGORIA_FINANCEIRO"
      },
      {
        label: "Status",
        type: "select",
        field: "CD_STATUS",
        width: 10,
        options: [{ID: "L", DS: "Liquidado"}, {ID: "P", DS: "Pago"}],
        required: true
      },
      {
        label: "Contrato",
        type: "lookup",
        field: "ID_CONTRATO",
        width: 22,
        lookup: "CONTRATOS",
        autocomplete: {type: 'change', fill: ["ID_PESSOA"]}
      },
      {
        label: "Credor / Fornecedor",
        type: "lookup",
        field: "ID_PESSOA",
        width: 40,
        lookup: "PESSOAS",
        required: true
      },
      {
        label: "Documento",
        type: "text",
        field: "DOC_FINANCEIRO",
        width: 16
      },
      {
        label: "Valor",
        type: "currency",
        field: "VL_FINANCEIRO",
        width: 12,
        required: true
      },
      {
        label: "Documentos Comprobatórios",
        type: "subComponent",
        field: "FINANCEIRO_DOCUMENTOS",
        width: 50,
        height: 15 
      },
      {
        label: "Histórico",
        type: "textarea",
        field: "HISTORICO",
        width: 50,
        height: 16.1
      }
    ],
    tabs: []
  }

  subComponent: subComponent = {
    "FINANCEIRO_DOCUMENTOS": {
      subKey: "ID_FINANCEIRO_DOCUMENTO",
      subColumns: [
        {
          name: "Data",
          field: "DT_DOCUMENTO",
          width: 20,
          type: 'date'
        },
        {
          name: "Tipo",
          field: "TP_DOCUMENTO",
          width: 20
        },
        {
          name: "Descrição",
          field: "DS_DOCUMENTO",
          width: 55
        }
      ],
      subForm: [
        {
          label: "Data",
          type: "date",
          field: "DT_DOCUMENTO",
          width: 20,
          required: true
        },
        {
          label: "Tipo",
          type: "select",
          field: "TP_DOCUMENTO",
          width: 20,
          options: [{ID: "C", DS: "Comprovante"},{ID: "N", DS: "Nota Fiscal"},{ID: "G", DS: "Guia de Pagto"},{ID: "R", DS: "Recibo"}, {ID: "O", DS: "Outros"}],
          required: true
        },
        {
          label: "Descrição",
          type: "text",
          field: "DS_DOCUMENTO",
          width: 55,
          required: true
        }
      ]
    }
  }

  formFilter: dataForm[] = [
    {
      label: "Fornecedor",
      type: "lookup",
      field: "ID_PESSOA",
      width: 32,
      lookup: "pessoas"
    },
    {
      label: "Data",
      type: "date",
      field: "DT_FINANCEIRO",
      width: 8,
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_FINANCEIRO",
      width: 8,
      required: true,

      options: [{ID: "D", DS: "Despesa"}, {ID: "R", DS: "Receita"}]
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_FINANCEIRO",
      width: 33,
      required: true
    },
    {
      label: "Categoria",
      type: "lookup",
      field: "ID_CATEGORIA_DETALHE",
      width: 12,
      lookup: "categorias"
    },
    {
      label: "Status",
      type: "select",
      field: "CD_STATUS",
      width: 8,
      options: [{ID: "L", DS: "Liquidado"}, {ID: "P", DS: "Pago"}],
      required: true
    }
  ]
}
