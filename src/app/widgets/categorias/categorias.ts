import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineService } from '../../services/engine-service';

@Component({
  selector: 'app-dash-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias {
  
  dataGrid: any[] = []

  constructor(private service: EngineService, private cdr: ChangeDetectorRef){ }

  async ngOnInit() {
    this.dataGrid = await this.service.widgetReq("categorias")


    this.cdr.detectChanges()
  }
}
