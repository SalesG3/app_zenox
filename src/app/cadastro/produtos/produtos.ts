import { Component } from '@angular/core';
import { Engine } from '../../session/engine/engine';
import { columnsGrid, dataForm, dataRow, engineConfig } from '../../session/engine/interfaces';

@Component({
  selector: 'app-produtos',
  imports: [Engine],
  template: `
    <app-engine
      compTitle="Cadastro de Produtos"
      dataKey="ID_PRODUTO"
      table="PRODUTOS"
      
      [dataRow]="dataRow"
      [columnsGrid]="columnsGrid"
      [dataForm]="dataForm"
      [formFilter]="formFilter" 
    ></app-engine>`,
  styles: ``,
})
export class Produtos {

  dataRow: dataRow = {
    ID_PRODUTO: 0,
    CD_PRODUTO: '',
    NM_PRODUTO: '',
    CD_BARRAS: '',
    UN_MEDIDA: '',
    VL_PRODUTO: '',
    HISTORICO: '',
    SN_ATIVO: true
  }

  columnsGrid: columnsGrid[] = [
    {
      name: "Código",
      field: "CD_PRODUTO",
      width: 15
    },
    {
      name: "Produto",
      field: "NM_PRODUTO",
      width: 60
    },
    {
      name: "Un. Medida",
      field: "UN_MEDIDA",
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
        field: "CD_PRODUTO",
        width: 12,
        required: true,
        autocomplete: { type: "codigo" }
      },
      {
        label: "Nome",
        type: "text",
        field: "NM_PRODUTO",
        width: 44,
        required: true
      },
      {
        label: "Un. Medida",
        type: "text",
        field: "UN_MEDIDA",
        width: 12,
        required: true
      },
      {
        label: "Cód. Barras",
        type: "text",
        field: "CD_BARRAS",
        width: 12
      },
      {
        label: "Preço",
        type: "currency",
        field: "VL_PRODUTO",
        width: 10,
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
      }
    ],
    tabs: []
  }

  formFilter: dataForm[] = [ ]
}
