import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Session } from '../../services/session';
import { menuEngine } from './menu.config';
import { CommonModule } from '@angular/common';
import { Dashboard } from '../dashboard/dashboard';
import { Workspace } from '../../services/workspace';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit{

  VERSION: string = ''
  NM_ENTIDADE: string = ''
  NM_USUARIO: string = ''
  ID_ANO: number = 0
  ID_MES: number = 0

  constructor(private session: Session, public workspace: Workspace, private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.NM_ENTIDADE = this.session.NM_ENTIDADE
    this.NM_USUARIO = this.session.NM_USUARIO
    this.ID_ANO = this.session.ID_ANO
    this.ID_MES = this.session.ID_MES
    this.VERSION = this.session.VERSION

  }

  meses: any = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro"
}

  menuEngine = menuEngine

  openFolder(folder: any){
    this.menuEngine.forEach(f => { if(f !== folder) f.open = false })

    folder.open = !folder.open
  }

  closeComponent(i: any){
    this.workspace.closeComponent(i)
    this.cdr.detectChanges()
  }
}
