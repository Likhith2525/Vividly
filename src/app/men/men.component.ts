import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {

  men=[];
  load:any;
  searchTerm:string;
  constructor(private router:Router,private dsObj:DataService) { }

  ngOnInit() {
    this.load=true;
    this.dsObj.getMenData().subscribe(
      data=>{
        this.men=data.message;
        this.load=false;
        //console.log(this.men)
      },
      err=>{
        console.log("ERROR is",err);
      }
    )

  }

  onClick(id){
    this.router.navigateByUrl('men/'+id)
  }

}
