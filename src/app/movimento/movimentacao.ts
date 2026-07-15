import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-movimentacao',
  standalone: true,
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Ordem de Serviço / Vendas"
    dataKey="ID_MOVIMENTACAO"
    table="MOVIMENTACOES"
    
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
export class Movimentacao {
  
  dataRow: dataRow = {
    ID_MOVIMENTACAO: 0,
    TP_MOVIMENTACAO: '',
    DT_MOVIMENTACAO: '',
    ID_PESSOA: '',
    ID_CONTRATO: '',
    DS_MOVIMENTACAO: '',
    CD_STATUS: '',
    VL_DESCONTO: '',
    VL_MOVIMENTACAO: '',
    DOC_MOVIMENTACAO: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "MOVIMENTACOES_ITENS": {
      ID_MOVIMENTACAO_ITEM: 0,
      CD_ITENS: '',
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
      field: "DT_MOVIMENTACAO",
      width: 6,
      type: 'date'
    },
    {
      name: "Tipo",
      field: "TP_MOVIMENTACAO",
      width: 10,
      type: "select",
      options: {"V": "Venda", "O": "Ordem de Serviço"}
    },
    {
      name: "Cliente",
      field: "ID_PESSOA",
      width: 22,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Descrição",
      field: "DS_MOVIMENTACAO",
      width: 18
    },
    {
      name: "Status",
      field: "CD_STATUS",
      width: 8,
      type: "select",
      options: {"O": "Orçamento", "A": "Aprovado", "L": "Liquidado", "P": "Pago"}
    },
    {
      name: "Total",
      field: "VL_MOVIMENTACAO",
      width: 6,
      type: "currency"
    }
  ]

  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_MOVIMENTACAO",
        width: 8,
        autocomplete: { type: "codigo" },
        required: true
      },
      {
        label: "Data",
        type: "date",
        field: "DT_MOVIMENTACAO",
        width: 12,
        required: true,
        autocomplete: { type: "today" }
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_MOVIMENTACAO",
        width: 12,
        required: true,
        options: [{ID: "V", DS: "Venda"}, {ID: "O", DS: "Ordem de Serviço"}]
      },
      {
        label: "Descrição",
        type: "text",
        field: "DS_MOVIMENTACAO",
        width: 48,
        required: true
      },
      {
        label: "Categoria",
        type: "lookup",
        field: "ID_CATEGORIA_DETALHE",
        width: 20,
        lookup: "CATEGORIA_MOVIMENTACAO",
        required: true
      },
      {
        label: "Status",
        type: "select",
        field: "CD_STATUS",
        width: 10,
        options: [
          {ID: "O", DS: "Orçamento"}, 
          {ID: "A", DS: "Aprovado"}, 
          {ID: "L", DS: "Liquidado"}, 
          {ID: "P", DS: "Pago"}
        ],
        required: true
      },
      {
        label: "Contrato",
        type: "lookup",
        field: "ID_CONTRATO",
        width: 22,
        lookup: "CONTRATOS",
        autocomplete: { type: "change", fill: ["ID_PESSOA"] }
      },
      {
        label: "Credor",
        type: "lookup",
        field: "ID_PESSOA",
        width: 32,
        lookup: "PESSOAS",
        required: true
      },
      {
        label: "Documento",
        type: "text",
        field: "DOC_MOVIMENTACAO",
        width: 12
      },
      {
        label: "Desconto",
        type: "currency",
        field: "VL_DESCONTO",
        width: 12
      },
      {
        label: "Total da OS/Venda",
        type: "currency", 
        field: "VL_MOVIMENTACAO",
        width: 12,
        required: true,
        readonly: true,
        expression: "SUM(MOVIMENTACOES_ITENS.VL_TOTAL) - dataRow.VL_DESCONTO"
      },
      {
        label: "Itens da OS/Venda",
        type: "subComponent",
        field: "MOVIMENTACOES_ITENS",
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
    "MOVIMENTACOES_ITENS": {
      subKey: "ID_MOVIMENTACAO_ITEM",
      subColumns: [
        {
          name: "Produto/Serviço",
          field: "ID_PRODUTO",
          width: 24,
          type: "lookup",
          table: "PRODUTOS_MOVIMENTACAO"
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
          lookup: "PRODUTOS_MOVIMENTACAO",
          autocomplete: {type: 'change', fill: ["UN_MEDIDA", "VL_UNITARIO"]},
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
          label: "Observação",
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

  formFilter: dataForm[] = [
    {
      label: "Data",
      type: "date",
      field: "DT_MOVIMENTACAO",
      width: 8,
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_MOVIMENTACAO",
      width: 12,
      required: true,
      options: [{ID: "V", DS: "Venda"}, {ID: "O", DS: "Ordem de Serviço"}]
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_MOVIMENTACAO",
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
      options: [
        {ID: "O", DS: "Orçamento"}, 
        {ID: "A", DS: "Aprovado"}, 
        {ID: "L", DS: "Liquidado"}, 
        {ID: "P", DS: "Pago"}
      ],
      required: true
    },
    {
      label: "Contrato",
      type: "lookup",
      field: "ID_CONTRATO",
      width: 14,
      lookup: "contratos",
      autocomplete: { type: "change", fill: ["ID_PESSOA"] }
    },
    {
      label: "Credor",
      type: "lookup",
      field: "ID_PESSOA",
      width: 20,
      lookup: "PESSOAS",
      required: true
    }
  ]
}