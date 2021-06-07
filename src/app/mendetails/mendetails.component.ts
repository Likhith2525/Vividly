import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductdetailsService } from '../productdetails.service';

@Component({
  selector: 'app-mendetails',
  templateUrl: './mendetails.component.html',
  styleUrls: ['./mendetails.component.css']
})
export class MendetailsComponent implements OnInit {

  proddetails:any;
  status:boolean=true;
   
  constructor(private ar:ActivatedRoute,private pdObj:ProductdetailsService) { }

  ngOnInit(){

    let id=this.ar.snapshot.params.id;
    this.pdObj.getMenDataById(id).subscribe(
        data=>{
          this.proddetails=data;
        },
        err=>{
          console.log("Error in getting data is",err)
        }
    )

    
  }
  change(){
    this.status=!this.status;
  }

}
