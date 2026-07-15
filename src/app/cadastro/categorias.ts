import { Component } from '@angular/core';
import { Engine } from '../session/engine/engine';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../session/engine/interfaces';

@Component({
  selector: 'app-categorias',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Cadastro de Categorias"
    dataKey="ID_CATEGORIA"
    table="CATEGORIAS"
    
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
export class Categorias {

  dataRow: dataRow = {
    ID_CATEGORIA: 0,
    CD_CATEGORIA: '',
    TP_CATEGORIA: '',
    NM_CATEGORIA: '',
    SN_ATIVO: true,
    HISTORICO: ''
  }

  dataSub: dataSub = {
    "CATEGORIA_DETALHE": {
      ID_CATEGORIA_DETALHE: 0,
      CD_DETALHE: '',
      NM_DETALHE: '',
      SN_ATIVO: true
    },
    "CATEGORIA_ORCAMENTO": {
      ID_CATEGORIA_ORCAMENTO: 0,
      DT_INICIO: '',
      DS_ORCAMENTO: '',
      VL_MINIMO: '',
      VL_MEDIO: '',
      VL_MAXIMO: ''
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Código",
      field: "CD_CATEGORIA",
      width: 10
    },
    {
      name: "Tipo",
      field: "TP_CATEGORIA",
      width: 15,
      type: "select",
      options: { "F": "Financeiro", "E": "Estoque", "M": "OS/Venda", "P":"Produto" }
    },
    {
      name: "Descrição",
      field: "NM_CATEGORIA",
      width: 65
    },
    {
      name: "Ativo",
      field: "SN_ATIVO",
      width: 10,
      type: "sn_ativo"
    }
  ]

  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_CATEGORIA",
        width: 12,
        autocomplete: { type: "codigo" },
        required: true
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_CATEGORIA",
        width: 18,
        options: [
          {ID: "F", DS: "Financeiro"},
          {ID: "E", DS: "Estoque"},
          {ID: "M", DS: "OS/Venda"},
          {ID: "P", DS: "Produto"}
        ],
        required: true
      },
      {
        label: "Descrição",
        type: "text",
        field: "NM_CATEGORIA",
        width: 66,
        required: true
      },
      {
        label: "Ativo",
        type: "checkbox",
        field: "SN_ATIVO",
        width: 4
      },
      {
        label: "Histórico",
        type: "textarea",
        field: "HISTORICO",
        width: 100,
      },
      {
        label: "Detalhamento",
        type: "subComponent",
        field: "CATEGORIA_DETALHE",
        width: 50,
        height: 15
      },
      {
        label: "Orçamento",
        type: "subComponent",
        field: "CATEGORIA_ORCAMENTO",
        width: 50,
        height: 15
      }
    ],
    tabs: []
  }

  subComponent: subComponent = {
    "CATEGORIA_DETALHE": {
      subColumns: [
        {
          name: "Código",
          field: "CD_DETALHE",
          width: 10,
        },
        {
          name: "Descrição",
          field: "NM_DETALHE",
          width: 24
        },
        {
          name: "Ativo",
          field: "SN_ATIVO",
          width: 6,
          type: "sn_ativo"
        }
      ],
      subForm: [
        {
          label: "Código",
          type: "number",
          field: "CD_DETALHE",
          width: 15,
          autocomplete: {type: 'codigo'},
          required: true
        },
        {
          label: "Descrição",
          type: "text",
          field: "NM_DETALHE",
          width: 70,
          required: true
        },
        {
          label: "Ativo",
          type: "checkbox",
          field: "SN_ATIVO",
          width: 6
        }
      ]
    },

    "CATEGORIA_ORCAMENTO": {
      subColumns: [
        {
          name: "Data",
          field: "DT_INICIO",
          width: 15,
          type: "date"
        },
        {
          name: "Observação",
          field: "DS_ORCAMENTO",
          width: 40
        },
        {
          name: "Mínimo",
          field: "VL_MINIMO",
          width: 15,
          type: "currency"
        },
        {
          name: "Médio",
          field: "VL_MEDIO",
          width: 15,
          type: "currency"
        },
        {
          name: "Máximo",
          field: "VL_MAXIMO",
          width: 15,
          type: "currency"
        }
      ],
      subForm: [
        {
          label: "Data",
          type: "date",
          field: "DT_INICIO",
          width: 25,
          autocomplete: {type: 'today'},
          required: true
        },
        {
          label: "Obervação",
          type: "text",
          field: "DS_ORCAMENTO",
          width: 60
        },
        {
          label: "Mín",
          type: "currency",
          field: "VL_MINIMO",
          width: 20,
          required: true
        },
        {
          label: "Med",
          type: "currency",
          field: "VL_MEDIO",
          width: 20,
          required: true
        },
        {
          label: "Max",
          type: "currency",
          field: "VL_MAXIMO",
          width: 20,
          required: true
        }
      ]
    }

  }

  formFilter: dataForm[] = [
    {
      label: "Código",
      type: "number",
      field: "CD_CATEGORIA",
      width: 8,
      autocomplete: { type: "codigo" },
      required: true
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_CATEGORIA",
      width: 12,
      options: [
        {ID: "F", DS: "Financeiro"},
        {ID: "E", DS: "Estoque"},
        {ID: "M", DS: "OS/Venda"},
        {ID: "P", DS: "Produto"}
      ],
      required: true
    },
    {
      label: "Descrição",
      type: "text",
      field: "NM_CATEGORIA",
      width: 26,
      required: true
    },
    {
      label: "Ativo",
      type: "select",
      field: "SN_ATIVO",
      width: 12,
      options: [
        {ID: "1", DS: "Sim"},
        {ID: "0", DS: "Não"}
      ]
    },
  ]

}
