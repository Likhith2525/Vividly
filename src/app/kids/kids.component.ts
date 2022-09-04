import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {

  men=[];
  searchTerm:string;
  mensize: string;
  load:any;

  constructor(private router:Router,private dsObj:DataService,private userService:UserService) { }

  ngOnInit() {
    this.load=true;

    this.dsObj.getKidsData().subscribe(
      data=>{
        this.men=data.message;
        this.load=false;

      },
      err=>{
        console.log("ERROR is",err);
      }
    )

  }

  onClick(id){
    this.router.navigateByUrl('kids/'+id)
  }

  

}
