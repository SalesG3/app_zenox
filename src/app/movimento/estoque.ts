import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Movimentação de Estoque"
    dataKey="ID_ESTOQUE"
    table="ESTOQUE"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"
    [formFilter]="formFilter"

  ></app-engine>
  `,
  styles: ``
})
export class Estoque {
  
  dataRow: dataRow = {
    ID_ESTOQUE: 0,
    CD_ESTOQUE: '',
    DT_ESTOQUE: '',
    TP_ESTOQUE: '',
    DS_ESTOQUE: '',
    ID_CONTRATO: null,
    ID_PESSOA: '',
    DOC_ESTOQUE: '',
    CD_STATUS: '',
    VL_ESTOQUE: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "ESTOQUE_ITENS": {
      ID_ESTOQUE_ITEM: 0,
      ID_PRODUTO: '',
      DS_ITENS: '',
      UN_MEDIDA: '',
      QT_ITENS: '',
      VL_UNITARIO: '',
      VL_TOTAL: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Data",
      field: "DT_ESTOQUE",
      width: 8,
      type: 'date'
    },
    {
      name: "Tipo",
      field: "TP_ESTOQUE",
      width: 12,
      type: "select",
      options: {"E": "Entrada", "S": "Saída"}
    },
    {
      name: "Descrição",
      field: "DS_ESTOQUE",
      width: 24
    },
    {
      name: "Pessoa",
      field: "ID_PESSOA",
      width: 20,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Valor Total",
      field: "VL_ESTOQUE",
      width: 8,
      type: "currency"
    }
  ]

  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_ESTOQUE",
        width: 8,
        autocomplete: { type: "codigo" },
        required: true
      },
      {
        label: "Data",
        type: "date",
        field: "DT_ESTOQUE",
        width: 12,
        required: true,
        autocomplete: { type: "today" }
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_ESTOQUE",
        width: 12,
        required: true,
        options: [{ID: "E", DS: "Entrada"}, {ID: "S", DS: "Saída"}]
      },
      {
        label: "Descrição",
        type: "text",
        field: "DS_ESTOQUE",
        width: 48,
        required: true
      },
      {
        label: "Categoria",
        type: "lookup",
        field: "ID_CATEGORIA_DETALHE",
        width: 20,
        lookup: "CATEGORIAS_ESTOQUE"
      },
      {
        label: "Status",
        type: "select",
        field: "CD_STATUS",
        width: 10,
        options: [{ID: "A", DS: "Aberto"}, {ID: "E", DS: "Efetivado"}, {ID: "C", DS: "Cancelado"}],
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
        label: "Fornecedor",
        type: "lookup",
        field: "ID_PESSOA",
        width: 40,
        lookup: "PESSOAS"
      },
      {
        label: "Documento",
        type: "text",
        field: "DOC_ESTOQUE",
        width: 16
      },
      {
        label: "Valor Total",
        type: "currency",
        field: "VL_ESTOQUE",
        width: 12,
        required: true,
        readonly: true,
        expression: "SUM(ESTOQUE_ITENS.VL_TOTAL)"
      },
      {
        label: "Itens da Movimentação",
        type: "subComponent",
        field: "ESTOQUE_ITENS",
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
    "ESTOQUE_ITENS": {
      subKey: "ID_ESTOQUE_ITEM",
      subColumns: [
        {
          name: "Código",
          field: "CD_ITENS",
          width: 12
        },
        {
          name: "Produto/Serviço",
          field: "ID_PRODUTO",
          width: 24,
          type: "lookup",
          table: "PRODUTOS_ESTOQUE",
        },
        {
          name: "Qtd",
          field: "QT_ITENS",
          width: 8
        },
        {
          name: "Vl. Unit",
          field: "VL_UNITARIO",
          width: 8,
          type: "currency"
        },
        {
          name: "Vl. Total",
          field: "VL_TOTAL",
          width: 8,
          type: "currency"
        }
      ],
      subForm: [
        {
          label: "Código",
          type: "number",
          field: "CD_ITENS",
          width: 12,
          autocomplete: { type: "codigo" },
          required: true
        },
        {
          label: "Produto / Serviço",
          type: "lookup",
          field: "ID_PRODUTO",
          width: 50,
          lookup: "PRODUTOS_ESTOQUE",
          autocomplete: { type: "change", fill: ["UN_MEDIDA", "VL_UNITARIO"] },
          required: true
        },
        {
          label: "UN",
          type: "text",
          field: "UN_MEDIDA",
          width: 14,
          readonly: true,
          required: true
        },
        {
          label: "Qtde",
          type: "number",
          field: "QT_ITENS",
          width: 14,
          required: true
        },
        {
          label: "Obersavação",
          type: "text",
          field: "DS_ITENS",
          width: 63.5
        },
        {
          label: "Vl Unit",
          type: "currency",
          field: "VL_UNITARIO",
          width: 14,
          required: true
        },
        {
          label: "Vl Total",
          type: "number",
          field: "VL_TOTAL",
          width: 14,
          readonly: true,
          required: true,
          expression: "dataSub.QT_ITENS * dataSub.VL_UNITARIO"
        }
      ]
    }
  }

  formFilter : dataForm[] = [
    {
      label: "Data",
      type: "date",
      field: "DT_ESTOQUE",
      width: 8,
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_ESTOQUE",
      width: 8,
      required: true,
      options: [{ID: "E", DS: "Entrada"}, {ID: "S", DS: "Saída"}]
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_ESTOQUE",
      width: 25,
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
      options: [{ID: "A", DS: "Aberto"}, {ID: "E", DS: "Efetivado"}, {ID: "C", DS: "Cancelado"}],
      required: true
    },
    {
      label: "Fornecedor",
      type: "lookup",
      field: "ID_PESSOA",
      width: 24,
      lookup: "pessoas"
    },
    {
      label: "Documento",
      type: "text",
      field: "DOC_ESTOQUE",
      width: 12
    }
  ]
}