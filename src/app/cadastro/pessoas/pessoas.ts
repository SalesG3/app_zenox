import { Component } from '@angular/core';
import { Engine } from '../../session/engine/engine';
import { columnsGrid, dataForm, dataRow, engineConfig } from '../../session/engine/interfaces';

@Component({
  selector: 'app-pessoas',
  imports: [Engine],
  template: `
    <app-engine
      compTitle="Cadastro de Pessoas"
      dataKey="ID_PESSOA"
      table="PESSOAS"
      
      [dataRow]="dataRow"
      [columnsGrid]="columnsGrid"
      [dataForm]="dataForm"
      [formFilter]="formFilter" 
    ></app-engine>`,
  styles: ``,
})
export class Pessoas {

  dataRow: dataRow = {
    ID_PESSOA: 0,
    CD_PESSOA: '',
    TP_PESSOA: '',
    NM_PESSOA: '',
    CADASTRO: '',
    HISTORICO: '',
    SN_ATIVO: true
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Código",
      field: "CD_PESSOA",
      width: 15
    },
    {
      name: "Nome",
      field: "NM_PESSOA",
      width: 60
    },
    {
      name: "Tipo",
      field: "TP_PESSOA",
      width: 15,
      type: "select",
      options: {"F": "Física","J":"Jurídica"}
    },
    {
      name: "CPF/CNPJ",
      field: "CADASTRO",
      width: 15
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
        field: "CD_PESSOA",
        width: 12,
        required: true,
        autocomplete: { type: "codigo" }
      },
      {
        label: "Tipo",
        type: "select",
        field: "TP_PESSOA",
        width: 16,
        required: true,
        options: [{ID: "F", DS: "Física"}, {ID: "J", DS: "Jurídica"}]
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
        mask: "000.000.000-00||00.AAA.000/0000-00"
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

  formFilter: dataForm[] = [ ]
}
