import { Component } from '@angular/core';
import { Engine } from '../../session/engine/engine';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../../session/engine/interfaces';

@Component({
  selector: 'app-venda',
  imports: [Engine],
  template: `
    <app-engine
      compTitle="Controle de Vendas"
      dataKey="ID_VENDA"
      table="VENDAS"
      
      [dataRow]="dataRow"
      [columnsGrid]="columnsGrid"
      [dataForm]="dataForm"
      [formFilter]="formFilter"

      [dataSub]="dataSub"
      [subComponent]="subComponent"
    ></app-engine>`,
  styles: ``,
})
export class Venda {
  
  dataRow: dataRow = {
    ID_VENDA: 0,
    CD_VENDA: '',
    DT_VENDA: '',
    DS_VENDA: '',
    ID_PESSOA: '',
    NU_DOCUMENTO: '',
    VL_DESCONTO: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "VENDA_PRODUTO": {
      CD_VENDA_PRODUTO: '',
      ID_PRODUTO: '',
      QT_VENDA_PRODUTO: '',
      VL_VENDA_PRODUTO: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Data",
      field: "DT_VENDA",
      width: 12,
      type: "date"
    },
    {
      name: "Descrição",
      field: "DS_VENDA",
      width: 30
    },
    {
      name: "Cliente",
      field: "ID_PESSOA",
      width: 30,
      type: "lookup",
      table: "PESSOAS"
    },
    {
      name: "Documento",
      field: "NU_DOCUMENTO",
      width: 16
    },
    {
      name: "Desconto",
      field: "VL_DESCONTO",
      width: 12,
      type: "currency"
    }
  ]

  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_VENDA",
        width: 12,
        required: true,
        autocomplete: { type: "codigo" }
      },
      {
        label: "Data",
        type: "date",
        field: "DT_VENDA",
        width: 12,
        required: true,
        autocomplete: { type: "today" }
      },
      {
        label: "Descrição",
        type: "text",
        field: "DS_VENDA",
        width: 40,
        required: true
      },
      {
        label: "Num. Documento",
        type: "text",
        field: "NU_DOCUMENTO",
        width: 16
      },
      {
        label: "Cliente",
        type: "lookup",
        field: "ID_PESSOA",
        width: 40,
        lookup: "PESSOAS",
        required: true
      },
      {
        label: "Valor Desconto",
        type: "currency",
        field: "VL_DESCONTO",
        width: 12
      },
      {
        label: "Histórico",
        type: "textarea",
        field: "HISTORICO",
        width: 100
      },
      {
        label: "Itens",
        type: "subComponent",
        field: "VENDA_PRODUTO",
        width: 50,
        height: 15
      }
    ],
    tabs:[]
  }

  subComponent: subComponent = {
    "VENDA_PRODUTO": {
      subKey: "ID_VENDA_PRODUTO",
      subColumns: [
        {
          name: "Código",
          width: 12,
          field: "CD_VENDA_PRODUTO"
        },
        {
          name: "Produto",
          width: 40,
          field: "ID_PRODUTO",
          type: "lookup",
          table: "PRODUTOS"
        },
        {
          name: "Qtde",
          width: 15,
          field: "QT_VENDA_PRODUTO"
        },
        {
          name: "Valor",
          width: 15,
          field: "VL_VENDA_PRODUTO",
          type: "currency"
        }
      ],

      subForm: [
        {
          label: "Código",
          type: "number",
          field: "CD_VENDA_PRODUTO",
          width: 12,
          required: true,
          autocomplete: { type: "codigo" }
        },
        {
          label: "Produto",
          type: "lookup",
          field: "ID_PRODUTO",
          width: 40,
          lookup: "PRODUTOS",
          required: true
        },
        {
          label: "Qtde",
          type: "number",
          field: "QT_VENDA_PRODUTO",
          width: 12,
          required: true
        },
        {
          label: "Valor Un.",
          type: "currency",
          field: "VL_VENDA_PRODUTO",
          width: 18
        }
      ]
    }
  }

  formFilter: dataForm[] = []
}
