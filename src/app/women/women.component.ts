import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {
  women=[];
  searchTerm:string;
  load:any;

  constructor(private router:Router,private dsObj:DataService) { }

  ngOnInit() {
    this.load=true;
    this.dsObj.getWomenData().subscribe(
      data=>{

        this.women=data.message;
        this.load=false;

      },
      err=>{
        console.log("ERROR is",err);
      }
    )

  }

  onClick(id){
    this.router.navigateByUrl('women/'+id)
  }

}
