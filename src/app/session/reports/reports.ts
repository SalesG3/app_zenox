import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Formgroup } from '../formgroup/formgroup';
import { EngineService } from '../../services/engine-service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule, Formgroup],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {

  @Input() dataReports: any = [ ]
  @Input() title: string = ''

  ID_RELATORIO: number = 0

  dataLookups: any = { }

  constructor(private cdr: ChangeDetectorRef, private service: EngineService){ }

  async lookup(lookup: any){
    let data = await this.service.filters(lookup)
    this.dataLookups[lookup] = data
    this.cdr.detectChanges()
  }

  async emitReport(){
    let report = this.dataReports.find((r: any) => r.ID == this.ID_RELATORIO)

    let data = await this.service.reportEmit(report)

    const byteCharacters = atob(data.file.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob), '_blank')
  }

}
