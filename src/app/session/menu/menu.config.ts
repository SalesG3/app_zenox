import { Pessoas } from "../../cadastro/pessoas/pessoas";
import { Produtos } from "../../cadastro/produtos/produtos";
import { Estoque } from "../../movimento/estoque/estoque";
import { Financeiro } from "../../movimento/financeiro/financeiro";
import { Venda } from "../../movimento/venda/venda";
import { EstoqueReport } from "../../relatorios/estoque/estoque";
import { Entidade } from "../../seguranca/entidade/entidade";


export const menuEngine: menuEngine[] = [
    {
        folder: "Cadastro",
        icon: 'fa-solid fa-folder-open',
        open: false,
        route: "cadastro",
        itens: [
           { label: "Pessoas", route: "pessoas", icon: "fa-solid fa-address-book", component: Pessoas},
           { label: "Produtos", route: "produtos", icon: "fa-solid fa-boxes-packing", component: Produtos},
        ],
    },
    {
        folder: "Movimentação",
        icon: "fa-solid fa-folder-open",
        open: false,
        route: "movimentacao",
        itens: [
            { label: "Estoque", route: "estoque", icon: "fa-solid fa-boxes-packing", component: Estoque},
            { label: "Financeiro", route: "financeiro", icon: "fa-solid fa-calculator", component: Financeiro},
            { label: "Venda", route: "venda", icon: "fa-solid fa-gears", component: Venda}
        ]
    },
    {
        folder: "Relatórios",
        icon: "fa-solid fa-folder-open",
        open: false,
        route: "relatorios",
        itens: [
            //{ label: "Relatórios - Estoque", route: "estoque", icon: "fa-solid fa-file-lines", component: EstoqueReport }
        ]
    },
    {
        folder: "Segurança",
        icon: "fa-solid fa-folder-open",
        open: false,
        route: "seguranca",
        itens: [
            { label: "Entidade & Configurações", route: "entidade", icon:"fa-solid fa-sliders", component: Entidade }
        ]
    }

]

interface menuEngine{
    folder: string,
    icon: string,
    open: boolean,
    route: string,
    itens: { label: string, route: string, icon: string, component: any }[]
}