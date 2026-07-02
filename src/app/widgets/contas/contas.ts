import { ChangeDetectorRef, Component } from '@angular/core';
import { EngineService } from '../../services/engine-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contas',
  imports: [CommonModule],
  templateUrl: './contas.html',
  styleUrl: './contas.css',
})
export class Contas {

  dataGrid: any[] = []

  constructor(private service: EngineService, private cdr: ChangeDetectorRef){ }

  async ngOnInit() {
    this.dataGrid = await this.service.widgetReq("contas")

    this.cdr.detectChanges()
    
  }
}
