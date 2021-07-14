import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {

   userObj;
   count;
   userCartObj;
   products=[];
  constructor(private hc:HttpClient,private us:UserService) { }

  ngOnInit(): void {



        //get user data from local storage
        this.userObj= JSON.parse(localStorage.getItem("userObj"))

        //get userCartObj from API
        this.us.getProductsFromUserCart(this.userObj.username).subscribe(
          res=>{
            if(res.message==='Cart-empty'){
              this.us.updateDataObservable(0)
            }
            else{
              this.us.updateDataObservable(res.message)
            }
            this.us.dataObservable.subscribe(prodObj=>{
               if(prodObj==0){
                  this.count=0;
               }
               else{
                 this.count=prodObj.products.length;
               }
            })
          }
        )

        this.us.dataObservable.subscribe(
          res=>{
    
           
            if(res["message"]==='Cart-empty'){
              alert("User cart is empty")
            }
            else{
              
                this.products=res["products"]
              
            }
          },
          err=>{
            console.log("err in reading cart",err)
            alert("Something went wrong in fetching cart items..")
          }
        )
    
  }


}
