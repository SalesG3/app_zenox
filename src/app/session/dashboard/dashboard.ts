import { Component } from '@angular/core';
import { Default } from '../../widgets/default/default';
import { CommonModule } from '@angular/common';
import { Categorias } from '../../widgets/categorias/categorias';
import { Contas } from '../../widgets/contas/contas';
import { Produtos } from '../../widgets/produtos/produtos';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Default,
    Categorias,
    Contas,
    Produtos
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
