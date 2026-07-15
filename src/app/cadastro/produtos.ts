import { Component } from '@angular/core';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../session/engine/interfaces';
import { Engine } from '../session/engine/engine';

@Component({
  selector: 'app-produtos',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Cadastro de Produtos"
    dataKey="ID_PRODUTO"
    table="PRODUTOS"
    
    [dataRow]="dataRow"
    [dataSub]="dataSub"
    [columnsGrid]="columnsGrid"
    [dataForm]="dataForm"
    [subComponent]="subComponent"
    [formFilter]="formFilter"

></app-engine>`,
  styles: '',
})
export class Produtos {
  dataRow: dataRow = {
    ID_PRODUTO: 0,
    CD_PRODUTO: '',
    NM_PRODUTO: '',
    TP_PRODUTO: '',
    CD_BARRAS: '',
    UN_MEDIDA: '',
    ID_PESSOA: null,
    NM_MARCA: '',
    SN_ATIVO: true
  }

  dataSub: dataSub = {
    "PRODUTO_ESTOQUE": {
      ID_PRODUTO: 0,
      DT_INICIO: '',
      MIN_ESTOQUE: '',
      MED_ESTOQUE: '',
      MAX_ESTOQUE: '',
      MED_CUSTO:'',
      MAX_CUSTO:'',
      MED_PRECO:'',
      MIN_PRECO:''
    },
    "PRODUTO_MATERIAL": {
      ID_PRODUTO: 0,
      DT_MATERIAL: '',
      ID_MATERIAL: '',
      DS_MATERIAL: '',
      QT_MATERIAL: '',
      SN_ATIVO: true
    }
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Codigo",
      field: "CD_PRODUTO",
      width: 8
    },
    {
      name: "Produto",
      field: "NM_PRODUTO",
      width: 28
    },
    {
      name: "Tipo",
      field: "TP_PRODUTO",
      width: 12,
      type: 'select',
      options: {"M": "Material", "P":"Produto", "S":"Serviço"}
    },
    {
      name: "Un Medida",
      field: "UN_MEDIDA",
      width: 8
    },
    {
      name: "Marca",
      field: "NM_MARCA",
      width: 12
    }
  ]

  dataForm: engineConfig = {
    master: [
      {
        label: "Código",
        type: "number",
        field: "CD_PRODUTO",
        width: 8,
        required: true,
        autocomplete: {type: 'codigo'}
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_PRODUTO",
        width: 16,
        required: true,
        options: [{ID: "M", DS: "Material"}, {ID: "P", DS: "Produto"}, {ID: "S", DS: "Serviço"}]
      },
      {
        label: "Nome",
        type: "text",
        field: "NM_PRODUTO",
        width: 40,
        required: true
      },
      {
        label: "Categoria",
        type: "lookup",
        field: "ID_CATEGORIA",
        width: 16,
        lookup: "CATEGORIAS_PRODUTOS"
      },
      {
        label: "Código de Barras",
        type: "text",
        field: "CD_BARRAS",
        width: 16,
      },
      {
        label: "Ativo",
        type: "checkbox",
        field: "SN_ATIVO",
        width: 4
      },
      {
        label: "Un. Medida",
        type: "text",
        field: "UN_MEDIDA",
        width: 8,
        required: true
      },
      {
        label: "Marca",
        type: "text",
        field: "NM_MARCA",
        width: 16,
      },
      {
        label: "Fornecedor",
        type: "lookup",
        field: "ID_PESSOA",
        width: 40,
        lookup: "PESSOAS"
      },
      {
        label: "Histórico",
        type: "textarea",
        field: "HISTORICO",
        width: 100
      },
      {
        label: "Controle de Estoque",
        type: "subComponent",
        field: "PRODUTO_ESTOQUE",
        width: 50,
        height: 15,
      },
      {
        label: "Material Necessário",
        type: "subComponent",
        field: "PRODUTO_MATERIAL",
        width: 50,
        height: 15,
      },
    ],
    tabs: []
  }

  subComponent: subComponent = {
    "PRODUTO_ESTOQUE": {
      
      subColumns: [
        {
          name: "Data",
          field: "DT_INICIO",
          width: 8,
          type: 'date'
        },
        {
          name: "Estoque Min",
          field: "MIN_ESTOQUE",
          width: 8
        },
        {
          name: "Estoque Med",
          field: "MED_ESTOQUE",
          width: 8
        },
        {
          name: "Estoque Max",
          field: "MAX_ESTOQUE",
          width: 8
        }
      ],
      subForm: [
        {
          label: "Data Início",
          type: "date",
          field: "DT_INICIO",
          width: 22.5,
          required: true,
          autocomplete: { type: "today" }
        },
        {
          label: "Estoque Min",
          type: "number",
          field: "MIN_ESTOQUE",
          width: 22.5,
          required: true
        },
        {
          label: "Estoque Med",
          type: "number",
          field: "MED_ESTOQUE",
          width: 22.5,
          required: true
        },
        {
          label: "Estoque Max",
          type: "number",
          field: "MAX_ESTOQUE",
          width: 22.5,
          required: true
        },
        {
          label: "Custo Med",
          type: "currency",
          field: "MED_CUSTO",
          width: 22.5,
          required: true
        },
        {
          label: "Custo Max",
          type: "currency",
          field: "MAX_CUSTO",
          width: 22.5,
          required: true
        },
        {
          label: "Preço Min",
          type: "currency",
          field: "MIN_PRECO",
          width: 22.5,
          required: true
        },
        {
          label: "Preço Med",
          type: "currency",
          field: "MED_PRECO",
          width: 22.5,
          required: true
        }
      ]
    },
    "PRODUTO_MATERIAL": {
      
      subColumns: [
        {
          name: "Data",
          field: "DT_MATERIAL",
          width: 20,
          type: "date"
        },
        {
          name: "Material",
          field: "ID_MATERIAL",
          width: 50,
          type: "lookup",
          table: "PRODUTOS_MATERIAL"
        },
        {
          name: "Qtde.",
          field: "QT_MATERIAL",
          width: 15
        },
        {
          name: "Ativo",
          field: "SN_ATIVO",
          width: 15,
          type: "sn_ativo"
        }
      ],
      subForm: [
        {
          label: "Dt. Início",
          type: "date",
          field: "DT_MATERIAL",
          width: 20,
          autocomplete: { type: "today" },
          required: true
        },
        {
          label: "Material",
          type: "lookup",
          field: "ID_MATERIAL",
          width: 60,
          lookup: "PRODUTOS_MATERIAL",
          required: true
        },
        {
          label: "Ativo",
          type: "checkbox",
          field: "SN_ATIVO",
          width: 6
        },
        {
          label: "Qtde.",
          type: "number",
          field: "QT_MATERIAL",
          width: 20,
          required: true
        },
        {
          label: "Observação",
          type: "text",
          field: "DS_MATERIAL",
          width: 60
        }
      ]
    }
    
  }

  formFilter : dataForm[] = [
    {
      label: "Código",
      type: "number",
      field: "CD_PRODUTO",
      width: 8
    },
    {
      label: "Nome",
      type: "text",
      field: "NM_PRODUTO",
      width: 32
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_PRODUTO",
      width: 12,
      options: [{ID: "M", DS: "Material"}, {ID: "P", DS: "Produto"}, {ID: "S", DS: "Serviço"}]
    },
    {
      label: "Código de Barras",
      type: "text",
      field: "CD_BARRAS",
      width: 16,
    },
    {
      label: "Un. Medida",
      type: "text",
      field: "UN_MEDIDA",
      width: 8
    },
    {
      label: "Fornecedor",
      type: "lookup",
      field: "ID_PESSOA",
      width: 32,
      lookup: "pessoas"
    },
    {
      label: "Marca",
      type: "text",
      field: "NM_MARCA",
      width: 16,
    }
  ]
}
