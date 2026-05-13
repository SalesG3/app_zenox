export interface columnsGrid {
    name: string,
    field: string,
    width: number,
    type?: "date"|"sn_ativo"
}

export interface dataForm{
    label: string,
    type: string,
    field: string,
    width: number,
    height?: number,
    required: boolean,
    options?: options[],
    lookup?: {table: string, ID: string, DS: string[]},
    autocomplete?: 'codigo'|'change',
}

export interface options{
    ID: string,
    DS: string
}