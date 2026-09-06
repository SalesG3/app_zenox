import { Injectable, OnInit } from '@angular/core';
import { menuEngine } from '../session/menu/menu.config';
import { Dashboard } from '../session/dashboard/dashboard';

@Injectable({
  providedIn: 'root',
})
export class Workspace implements OnInit{

  activeWorspace: string = 'dashboard'
  
  menuEngine = menuEngine
    
  moduleWorkspace: any[] = [
    {label: 'Dashboard', route: 'dashboard', icon: 'fa-solid fa-tags', component: Dashboard}
  ]

  engineWorkspace: any[] = [
    {label: 'Dashboard', route: 'dashboard', icon: 'fa-solid fa-tags', component: Dashboard}
  ]

  ngOnInit(): void {
    menuEngine.forEach(i => {
      i.itens.forEach(x => {
        this.moduleWorkspace.push(x)
      })
    })
  }

  openComponent(i: any){

    if(this.engineWorkspace.find(x => x.route === i.route)){
      this.activeWorspace = i.route
      return
    }

    this.engineWorkspace.push(i)
    this.activeWorspace = i.route
  }

  closeComponent(i: any){

    if(this.activeWorspace == i.route){
      this.activeWorspace = 'dashboard'
    }

    this.engineWorkspace = this.engineWorkspace.filter(x => x.route !== i.route)
  }
  
}
