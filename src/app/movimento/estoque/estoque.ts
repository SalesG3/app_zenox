import { Component } from '@angular/core';
import { Engine } from '../../session/engine/engine';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../../session/engine/interfaces';

@Component({
  selector: 'app-estoque',
  imports: [Engine],
  template: `
    <app-engine
      compTitle="Controle de Estoque"
      dataKey="ID_ESTOQUE"
      table="ESTOQUE"
      
      [dataRow]="dataRow"
      [columnsGrid]="columnsGrid"
      [dataForm]="dataForm"
      [formFilter]="formFilter"

      [dataSub]="dataSub"
      [subComponent]="subComponent"
    ></app-engine>`,
  styles: ``,
})
export class Estoque {

  dataRow: dataRow = {
    ID_ESTOQUE: 0,
    CD_ESTOQUE: '',
    DT_ESTOQUE: '',
    TP_ESTOQUE: 'E',
    DS_ESTOQUE: '',
    ID_PESSOA: '',
    NU_DOCUMENTO: '',
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "ESTOQUE_PRODUTO": {
      CD_ESTOQUE_PRODUTO: '',
      ID_PRODUTO: '',
      QT_ESTOQUE_PRODUTO: '',
      VL_ESTOQUE_PRODUTO: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Data",
      field: "DT_ESTOQUE",
      width: 12,
      type: 'date'
    },
    {
      name: "Tipo",
      field: "TP_ESTOQUE",
      width: 12,
      type: 'select',
      options: {"E":"Entrada", "B":"Baixa"}
    },
    {
      name: "Descrição",
      field: "DS_ESTOQUE",
      width: 30
    },
    {
      name: "Cliente/Fornecedor",
      field: "ID_PESSOA",
      width: 30,
      type: 'lookup',
      table: "PESSOAS"
    },
    {
      name: "Documento",
      field: "NU_DOCUMENTO",
      width: 14
    }
  ]

  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_ESTOQUE",
        width: 12,
        required: true,
        autocomplete: { type: "codigo" }
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
        label: "Descrição",
        type: "text",
        field: "DS_ESTOQUE",
        width: 50,
        required: true
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_ESTOQUE",
        width: 16,
        required: true,
        options: [{ID: "E", DS: "Entrada"}, {ID: "B", DS: "Baixa"}]
      },
      {
        label: "Num. Documento",
        type: "text",
        field: "NU_DOCUMENTO",
        width: 12
      },
      {
        label: "Fornecedor",
        type: "lookup",
        field: "ID_PESSOA",
        width: 40,
        required: true,
        lookup: "PESSOAS"
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
        field: "ESTOQUE_PRODUTO",
        width: 50,
        height: 15
      }
    ],
    tabs: []
  }

  subComponent: subComponent = {
    "ESTOQUE_PRODUTO": {
      subKey: "ID_ESTOQUE_PRODUTO",

      subColumns: [
        {
          name: "Código",
          field: "CD_ESTOQUE_PRODUTO",
          width: 12
        },
        {
          name: "Produto",
          field: "ID_PRODUTO",
          width: 24,
          type: "lookup",
          table: "PRODUTOS"
        },
        {
          name: "Qtde",
          field: "QT_ESTOQUE_PRODUTO",
          width: 12
        },
        {
          name: "Valor",
          field: "VL_ESTOQUE_PRODUTO",
          width: 12,
          type: "currency"
        }
      ],
      subForm: [
        {
          label: "Código",
          type: "number",
          field: "CD_ESTOQUE_PRODUTO",
          width: 10,
          required: true,
          autocomplete: { type: "codigo" }
        },
        {
          label: "Produto",
          type: "lookup",
          field: "ID_PRODUTO",
          width: 40,
          required: true,
          lookup: "PRODUTOS"
        },
        {
          label: "Qtde",
          type: "number",
          field: "QT_ESTOQUE_PRODUTO",
          width: 20,
          required: true
        },
        {
          label: "Valor Un.",
          type: "currency",
          field: "VL_ESTOQUE_PRODUTO",
          width: 20,
          required: true
        }
      ]
    }
  }


  formFilter: dataForm[] = []
}
