import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductdetailsService } from '../productdetails.service';

@Component({
  selector: 'app-womendetails',
  templateUrl: './womendetails.component.html',
  styleUrls: ['./womendetails.component.css']
})
export class WomendetailsComponent implements OnInit {

  proddetails:any;
  constructor(private ar:ActivatedRoute,private pdObj:ProductdetailsService) { }

  ngOnInit(): void {

    let id=this.ar.snapshot.params.id;

    this.pdObj.getWomenDataById(id).subscribe(
      data=>{
        this.proddetails=data;
      },
      err=>{
        console.log("Error in getting data is",err)
      }
  )
  }

}
