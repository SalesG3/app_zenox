import { Component } from '@angular/core';
import { Engine } from '../session/engine/engine';
import { dataForm, dataSub, engineConfig, subComponent } from '../session/engine/interfaces';

@Component({
  selector: 'app-pessoas',
  imports: [Engine],
  template: `
    <app-engine
      compTitle="Cadastro de Pessoas"
      dataKey="ID_PESSOA"
      table="PESSOAS"
      
      [dataRow]="dataRow"
      [dataSub]="dataSub"
      [columnsGrid]="columnsGrid"
      [dataForm]="dataForm"
      [subComponent]="subComponent"
      [formFilter]="formFilter" 
    ></app-engine>`,
  styles: '',
})
export class Pessoas {

  dataRow: any = {
    ID_PESSOA: 0,
    CD_PESSOA: '',
    NM_PESSOA: '',
    CADASTRO: '',
    TP_PESSOA: '',
    SN_ATIVO: true,
    HISTORICO: '',
    END_LOGRADOURO: '',
    END_NUMERO: '',
    END_BAIRRO: '',
    ID_CIDADE: '',
    END_CEP: '',
    END_COMPLEMENTO: '',
    CON_TELEFONE: '',
    CON_CELULAR: '',
    CON_EMAIL: ''
  }

  dataSub: dataSub = { }

  columnsGrid: any[] = [
    {
      name: "Código",
      field: "CD_PESSOA",
      width: 8
    },
    {
      name: "Nome",
      field: "NM_PESSOA",
      width: 24
    },
    {
      name: "Tipo",
      field: "TP_PESSOA",
      width: 16,
      type: 'select',
      options: {"F": "Física", "J": "Jurídica"}
    },
    {
      name: "CPF/CNPJ",
      field: "CADASTRO",
      width: 16
    },
    {
      name: "Ativo",
      field: "SN_ATIVO",
      width: 8,
      type: 'sn_ativo'
    }
  ]

    dataForm: engineConfig = {
      master: [
      {
        label: "Código",
        type: "number",
        field: "CD_PESSOA",
        width: 12,
        required: true,
        autocomplete: {type: "codigo"}
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_PESSOA",
        width: 16,
        required: true,
        options: [{ID: 'F', DS: 'Física'}, {ID: 'J', DS: 'Jurídica'}]
      },
      {
        label: "Nome",
        type: "text",
        field: "NM_PESSOA",
        width: 50,
        required: true
      },
      {
        label: "CPF/CNPJ",
        type: "text",
        field: "CADASTRO",
        width: 18,
        required: true,
        mask: '000.000.000-00||00.000.000/0000-00'
      },
      {
        label: "Ativo",
        type: "checkbox",
        field: "SN_ATIVO",
        width: 4,
      },
      {
        label: "Celular",
        type: "text",
        field: "CON_CELULAR",
        width: 12,
        mask: "(00)00000-0000"
      },
      {
        label: "Telefone",
        type: "text",
        field: "CON_TELEFONE",
        width: 12,
        mask: "(00)00000-0000"
      },
      {
        label: "Email",
        type: "text",
        field: "CON_EMAIL",
        width: 24
      },
      {
        label: "Endereço",
        type: "text",
        field: "END_LOGRADOURO",
        width: 24
      },
      {
        label: "Número",
        type: "number",
        field: "END_NUMERO",
        width: 8
      },
      {
        label: "Bairro",
        type: "text",
        field: "END_BAIRRO",
        width: 16
      },
      {
        label: "Cidade/UF",
        type: "lookup",
        field: "ID_CIDADE",
        width: 24,
        lookup: "CIDADES"
      },
      {
        label: "CEP",
        type: "text",
        field: "END_CEP",
        width: 12,
        mask: '00.000-000'
      },
      {
        label: "Complemento",
        type: "text",
        field: "END_COMPLEMENTO",
        width: 24
      },
      {
        label: "Histórico",
        type: "textarea",
        field: "HISTORICO",
        width: 100,
        height: 4,
      }
    ],
    tabs: [ ]
  }

  subComponent: subComponent = { }

  formFilter : dataForm[] = [
    {
      label: "Código",
      type: "number",
      field: "CD_PESSOA",
      width: 8,
    },
    {
      label: "Tipo",
      type: "select",
      field: "TP_PESSOA",
      width: 12,
      options: [{ID: 'F', DS: 'Física'}, {ID: 'J', DS: 'Jurídica'}]
    },
    {
      label: "Nome",
      type: "text",
      field: "NM_PESSOA",
      width: 32,
    },
    {
      label: "CPF/CNPJ",
      type: "text",
      field: "CADASTRO",
      width: 16,
      mask: '000.000.000-00||00.000.000/0000-00'
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
    }
  ]
}
