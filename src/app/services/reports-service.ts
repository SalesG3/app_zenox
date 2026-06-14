import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Session } from './session';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {

    constructor(private session: Session){ }
  

  async reportEmit(type: string, report: any){

    let req = await fetch(environment.api + `reports/${type}/${report.table}`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "X_SESSION": this.session.X_SESSION
      },
      body: JSON.stringify({ columns: report.columns, filters: report.filters})
    })

    let data = await req.json()

    return data
  }
}
