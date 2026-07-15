import { Component } from '@angular/core';
import { Engine } from '../session/engine/engine';
import { columnsGrid, dataForm, dataRow, dataSub, engineConfig, subComponent } from '../session/engine/interfaces';

@Component({
  selector: 'app-contas',
  imports: [Engine],
  template: `
  <app-engine
    compTitle="Cadastro de Contas Bancárias"
    dataKey="ID_CONTA"
    table="CONTAS"
    
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
export class Contas {

  dataRow: dataRow = {
    ID_CONTA: 0,
    CD_CONTA: '',
    DG_CONTA: '',
    CD_AGENCIA: '',
    DS_CONTA: '',
    ID_CIDADE: null,
    SN_ATIVO: true,
    HISTORICO: ''
  }
  dataSub: dataSub = { }

  columnsGrid: columnsGrid[] = [
    {
      name: "Nº Conta",
      field: "CD_CONTA",
      width: 12
    },
    {
      name: "Digíto",
      field: "DG_CONTA",
      width: 4
    },
    {
      name: "Descrição",
      field: "DS_CONTA",
      width: 48
    },
    {
      name: "Ativo",
      field: "SN_ATIVO",
      width: 6,
      type: "sn_ativo"
    }
  ]
  dataForm: engineConfig = {
    master: [
      {
        label: "Nº Conta",
        type: "number",
        field: "CD_CONTA",
        width: 20,
        required: true
      },
      {
        label: "Digíto",
        type: "number",
        field: "DG_CONTA",
        width: 8,
        required: true
      },
      {
        label: "Nº Agencia",
        type: "number",
        field: "CD_AGENCIA",
        width: 15
      },
      {
        label: "Cidade/UF",
        type: "lookup",
        field: "ID_CIDADE",
        width: 18,
        lookup: "CIDADES"
      },
      {
        label: "Descrição",
        type: "text",
        field: "DS_CONTA",
        width: 34
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
        width: 100
      }
    ],
    tabs: []
  }

  subComponent: subComponent = { }

  formFilter :dataForm[] = [
    {
      label: "Nº Conta",
      type: "number",
      field: "CD_CONTA",
      width: 12,
      required: true
    },
    {
      label: "Digíto",
      type: "number",
      field: "DG_CONTA",
      width: 4,
      required: true
    },
    {
      label: "Nº Agencia",
      type: "number",
      field: "CD_AGENCIA",
      width: 8
    },
    {
      label: "Descrição",
      type: "text",
      field: "DS_CONTA",
      width: 24
    },
    {
      label: "Ativo",
      type: "select",
      field: "SN_ATIVO",
      width: 12,
      options: [
        {ID: "1", DS: "Sim"},
        {ID: "0", DS: "Não"}
      ],
      required: true
    }
  ]
}
