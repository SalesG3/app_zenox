import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { ReportsService } from '../../services/reports-service';
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
  @Input() type: string = ''

  ID_RELATORIO: number = 0

  dataRow: any = { }
  dataLookups: any = { }
  selectReport: any = null

  constructor(private cdr: ChangeDetectorRef, private service: ReportsService, private service2: EngineService){ }

  async lookup(lookup: any){
    let data = await this.service2.lookup(lookup)
    this.dataLookups[lookup.table] = data
    this.cdr.detectChanges()
  }

  async emitReport(){
    let report = this.dataReports.find((r: any) => r.ID == this.ID_RELATORIO)

    let data = await this.service.reportEmit(this.type, this.dataRow)

    const byteCharacters = atob(data.file.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob), '_blank')
  }

}
