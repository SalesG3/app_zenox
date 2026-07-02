import { ChangeDetectorRef, Component } from '@angular/core';
import { EngineService } from '../../services/engine-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  imports: [CommonModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos {
    
    dataGrid: any[] = []
  
    constructor(private service: EngineService, private cdr: ChangeDetectorRef){ }
  
    async ngOnInit() {
      this.dataGrid = await this.service.widgetReq("produtos")
  
  
      this.cdr.detectChanges()
    }
}
