import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductdetailsService } from '../productdetails.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-kidsdetails',
  templateUrl: './kidsdetails.component.html',
  styleUrls: ['./kidsdetails.component.css']
})
export class KidsdetailsComponent implements OnInit {

  proddetails:any;
  mensize:string;
  status:boolean=true;
  bgcolor1 = "white";
  bgcolor2 = "white";
  bgcolor3 = "white";
  bgcolor4 = "white";
  bgcolor5 = "white";
  
   
  constructor(private ar:ActivatedRoute,private pdObj:ProductdetailsService,private userService:UserService) { }

  ngOnInit(){

    let id=this.ar.snapshot.params.id;
    this.pdObj.getKidsDataById(id).subscribe(
        data=>{
          this.proddetails=data.message;
        },
        err=>{
          console.log("Error in getting data is",err)
        }
    )

    
  }
  change(){
    this.status=!this.status;
  }

  sendSize(size) {
    this.bgcolor1 = "white";
    this.bgcolor2 = "white";
    this.bgcolor3 = "white";
    this.bgcolor4 = "white";
    this.bgcolor5 = "white";

    this.mensize = size;
    if (size == "38") {
      this.bgcolor1 = "grey";
    }
    else if (size == "40") {
      this.bgcolor2 = "grey";
    }
    else if (size == "42") {
      this.bgcolor3 = "grey";
    }
    else if (size == "44") {
      this.bgcolor4 = "grey";
    }
    else if (size == "46") {
      this.bgcolor5 = "grey";
    }
   }

   //product selected by user
  onProductSelect(productObject) {
    
    productObject["size"] = this.mensize;

    //console.log(productObject)
    let username = localStorage.getItem("username")
    if(username!=null && this.mensize!=null){
    let newUserProductObj = { username, productObject }

   

    this.userService.sendProductToUserCart(newUserProductObj).subscribe(
      res => {
        alert(res['message'])
        this.userService.updateDataObservable(res.latestCartObj)
      },
      err => {
        console.log("err in posting product to cart ", err)
        alert("Something wrong in adding product to cart...")
      }
    )
    }
    else if(this.mensize==null){
      alert("Please select size !!")
    }
    else{
      alert("Please Login first !!")
    }

  }

  

}
