import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-formgroup',
  imports: [FormsModule, CommonModule, NgxMaskDirective, NgSelectModule],
  templateUrl: './formgroup.html',
  styleUrl: './formgroup.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class Formgroup {
  
  @Input() i: any
  @Input() dataRow: any
  @Input() dataConsult: boolean = false
  @Input() dataLookups: any = {}
  
  @Output() onLookupFocus = new EventEmitter<any>()
  @Output() onAutocomplete = new EventEmitter<any>()
  @Output() onConsultFile = new EventEmitter<any>()
  @Output() onReadonlyFocus = new EventEmitter<any>()

  lookup() {
    if (this.i.lookup) {
        this.onLookupFocus.emit(this.i.lookup);
    }
  }

  readonlyFocus(){
    if(this.i.readonly){
      this.onReadonlyFocus.emit()
    }
  }

  autocomplete(ID: any){
    if(this.i.autocomplete && this.i.autocomplete.type == 'change' && ID){

      let data1 = {
        ID: ID,
        table: this.i.lookup,
        fill: this.i.autocomplete.fill
      }

      let data = Object.fromEntries(this.i.autocomplete.fill.map(
        (key: any) => [key, ID[key]]
      ))

      this.onAutocomplete.emit(data)
    }
  }

  inputFile(event: any){
    const reader = new FileReader()
    let file = event.target.files[0]
    if(!file) return

    if(file.size > 1000000){
      alert("O limite para arquivos é de 1MB")
      event.target.value = ''
      return
    }

    if(file.type !== 'application/pdf'){
      alert("Apenas arquivos .PDF")
      event.target.value = ''
      return
    }

    reader.onload = () => {
      this.dataRow[this.i.field] = reader.result as string
      this.dataRow['SN_ANEXO'] = true
    }

    reader.readAsDataURL(file)
  }

  consultFile(){
    this.onConsultFile.emit()
  }

  inputImg(event: any){
    const reader = new FileReader()
    let file = event.target.files[0]
    if(!file) return

    if(file.size > 1000000){
      alert("O limite para arquivos é de 1MB")
      event.target.value = ''
      return
    }

    if(!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ){
      alert("Apenas arquivos de imagem")
      event.target.value = ''
      return
    }

    reader.onload = () => {
      this.dataRow[this.i.field] = reader.result as string
      this.dataRow['SN_ANEXO'] = true
    }

    reader.readAsDataURL(file)
  }
  
}
