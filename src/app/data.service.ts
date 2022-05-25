import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }

  getMenData():Observable<any>{

    return this.hc.get<any>('/user/getmen')

  }  

  getWomenData():Observable<any>{

    return this.hc.get<any>('/user/getwomen')
    
  }  

  getKidsData():Observable<any>{

    return this.hc.get<any>('/user/getkids')

  }  
}
