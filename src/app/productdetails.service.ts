import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {

  constructor(private hc:HttpClient) { }


  getMenDataById(id:any):Observable<any>{
     return this.hc.get(`/user/menproductsbyid/${id}`)
  }

  getWomenDataById(id):Observable<any>{
    return this.hc.get(`/user/womenproductsbyid/${id}`)
 }
 
 getKidsDataById(id):Observable<any>{
  return this.hc.get(`/user/kidsproductsbyid/${id}`)
}

}
