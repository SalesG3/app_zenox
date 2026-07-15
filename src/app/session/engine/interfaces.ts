export interface dataRow {
    
}

export interface dataSub {
    [table: string]: {}
}

export interface columnsGrid {
    name: string,
    field: string,
    width: number,

    type?: "date"|"sn_ativo"|"select"|"lookup"|"currency",
    options?: {[ID: string]: string},
    table?: string
}

export interface dataForm{
    label: string,
    type: "text"|"number"|"date"|"lookup"|"select"|"checkbox"|"textarea"|"subComponent"|"file"|"img"|"currency",
    field: string,
    width: number,

    height?: number,
    required?: boolean,
    readonly?: boolean,
    expression?: string,

    options?: {ID: string, DS: string}[],
    lookup?: string,
    autocomplete?: {type: "codigo"|"change"|"today", fill?: string[]},
    mask?: string
}

export interface subComponent {
    [table: string]: {
        subKey?: string
        subColumns: columnsGrid[],
        subForm: dataForm[]
    }
}

export interface abaForm {
    label: string,
    id: string,
    height: number,
    abaForm: dataForm[]
}

export interface engineConfig{
    master: dataForm[],
    tabs: abaForm[]
}