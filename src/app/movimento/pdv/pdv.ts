import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskPipe } from 'ngx-mask';
import { EngineService } from '../../services/engine-service';

@Component({
  selector: 'app-pdv',
  imports: [CommonModule, FormsModule , NgSelectModule, NgxMaskPipe],
  templateUrl: './pdv.html',
  styleUrl: './pdv.css',
})
export class Pdv implements OnInit{

  dataRow: any = {
    ID_VENDA: 0,
    CD_VENDA: 0,
    DT_VENDA: new Date().toLocaleDateString('en-CA'),
    DS_VENDA: 'Venda Comum',
    ID_PESSOA: null,
    NU_DOCUMENTO: '',
    VL_DESCONTO: '',
    HISTORICO: 'Gerado via PDV'
  }

  ID_METODO: any = {
    "1": "Dinheiro",
    "2": "PIX",
    "3": "Débito",
    "4": "Crédito",
    "5": "Boleto",
    "6": "Transferência"
  }

  dataRead: any = {
    NM_PRODUTO: null,
    VL_PRODUTO: null,
    QT_ITEM: 1,
    ID_PRODUTO: null
  }

  dataParcela: any = {
    CD_VENDA_PARCELA: 1,
    ID_METODO_PAG: '',
    VL_VENDA_PARCELA: ''
  }

  qtdeItems: number = 0
  vlrItems: number = 0
  vlrPagto: number = 0
  cdItem: number = 0
  dataLookups: any = {}
  dataClean: any = {}
  dataCleanII: any = {}

  dataItems: any[] = []
  dataParcelas: any[] = []

  @ViewChild('saveConfirm') saveConfirm !: ElementRef<HTMLDialogElement>

  constructor(private service: EngineService, private cdr: ChangeDetectorRef){}

  async ngOnInit() {
    this.dataClean = this.dataRow
    this.dataCleanII = this.dataParcela
    this.novaVenda()
  }

  async novaVenda(){
    this.dataRow = this.dataClean
    this.dataParcela = this.dataCleanII
    this.dataRead = {
      NM_PRODUTO: null,
      VL_PRODUTO: null,
      QT_ITEM: 1,
      ID_PRODUTO: null
    }

    this.qtdeItems = 0
    this.vlrItems = 0
    this.cdItem = 0
    this.vlrPagto = 0

    this.dataItems = []
    this.dataParcelas = []
    this.dataLookups.PESSOAS = await this.service.lookup("PESSOAS")
    this.dataLookups.PRODUTOS = await this.service.lookup("PRODUTOS_PDV")
    
    let codigo = await this.service.codigo("VENDAS", "CD_VENDA")
    this.dataRow = { ...this.dataRow, ...codigo }

    let pessoa = await this.service.lookup("CLIENTE_PADRAO")
    this.dataRow.ID_PESSOA = pessoa[0].ID_PESSOA
    this.cdr.detectChanges()
  }

  selectProduto(event: any){
    if(!event) return

    this.dataRead.NM_PRODUTO = event.NM_PRODUTO
    this.dataRead.VL_PRODUTO = event.VL_PRODUTO

    const exists = this.dataItems.find(i => event.CD_PRODUTO == i.CD_PRODUTO)
    if(exists) {
      exists.QT_ITEM += this.dataRead.QT_ITEM
      exists.VL_ITEM = exists.QT_ITEM * exists.VL_PRODUTO
    }
    else{  
      const playLoad = {
        ID_PRODUTO: event.ID,
        CD_ITEM: this.cdItem + 1,
        CD_PRODUTO: event.CD_PRODUTO,
        NM_PRODUTO: event.NM_PRODUTO,
        QT_ITEM: this.dataRead.QT_ITEM,
        VL_PRODUTO: event.VL_PRODUTO,
        VL_ITEM: this.dataRead.QT_ITEM * event.VL_PRODUTO
      }

      this.cdItem++
      this.dataItems.push(playLoad)
    }

    this.qtdeItems += this.dataRead.QT_ITEM
    this.vlrItems += this.dataRead.QT_ITEM * event.VL_PRODUTO

    setTimeout(() => {
      this.dataRead.ID_PRODUTO = undefined
      this.dataRead.QT_ITEM = 1
      this.cdr.detectChanges()
    })
  }

  adicionarPagto(){
    if(!this.dataParcela.ID_METODO_PAG || !this.dataParcela.VL_VENDA_PARCELA) return
    
    let playLoad = {
      CD_VENDA_PARCELA: this.dataParcela.CD_VENDA_PARCELA,
      DT_VENDA_PARCELA: new Date().toLocaleDateString('en-CA'),
      DT_PAGAMENTO: new Date().toLocaleDateString('en-CA'),
      ID_METODO_PAG: this.dataParcela.ID_METODO_PAG,
      VL_VENDA_PARCELA: this.dataParcela.VL_VENDA_PARCELA,
      NU_DOCUMENTO: ''
    }

    this.vlrPagto += this.dataParcela.VL_VENDA_PARCELA

    this.dataParcelas.push(playLoad)

    this.dataParcela = {
      CD_VENDA_PARCELA: this.dataParcela.CD_VENDA_PARCELA+ 1,
      ID_METODO_PAG: '',
      VL_VENDA_PARCELA: ''
    }

    this.cdr.detectChanges()
  }

  async salvarVenda(){
    let subGrid = []
    for(let i of this.dataItems){
      subGrid.push({
        CD_VENDA_PRODUTO: i.CD_ITEM,
        ID_PRODUTO: i.ID_PRODUTO,
        QT_VENDA_PRODUTO: i.QT_ITEM,
        VL_VENDA_PRODUTO: i.VL_PRODUTO
      })
    }

    let data = await this.service.insert("VENDAS", this.dataRow, {"VENDA_PRODUTO": subGrid, "VENDA_PARCELA": this.dataParcelas});
    alert(data.message)
    this.saveConfirm.nativeElement.close()

    if(data.sucess){
      await this.novaVenda()
    }
  }

  cancelarPagto(){
    this.dataParcela = {
      CD_VENDA_PARCELA: 1,
      ID_METODO_PAG: '',
      VL_VENDA_PARCELA: ''
    }

    this.vlrPagto = 0
    this.dataParcelas = []
    this.saveConfirm.nativeElement.close()
  }

  @HostListener('document:keydown.f2', ['$event'])
  async salvarVendaF2(event: Event){
    event.preventDefault()
    this.dataParcela.VL_VENDA_PARCELA = this.vlrItems
    this.saveConfirm.nativeElement.showModal()
  }

  @HostListener('document:keydown.f4', ['$event'])
  removerItemF4(event: Event){
    event.preventDefault()
    let i = this.dataItems.pop()
    this.cdItem = this.dataItems.length
    this.qtdeItems -= i.QT_ITEM
    this.vlrItems -= i.VL_ITEM
  }

  @HostListener('document:keydown.f3', ['$event'])
  cancelarVendaF3(event: Event){
    event.preventDefault()
    this.novaVenda()
  }

  @HostListener('document:keydown.f6', ['$event'])
  async finalizarVendaF6(event: Event){
    event.preventDefault()
    if(this.vlrItems - this.vlrPagto - this.dataRow.VL_DESCONTO == 0){
      await this.salvarVenda()
    }else{
      this.adicionarPagto()
    }
  }

}
