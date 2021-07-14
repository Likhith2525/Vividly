import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userObj:User={username:"",password:"",dob:"",email:""};

  constructor(private us:UserService,private rs:Router) { }
  onSignup(){
    let obj=this.userObj;
    this.us.createUser(obj).subscribe(
      res=>{
        if(res.message==="New user created successfully"){
          alert("User Created")
          //navigate to login component
          this.rs.navigateByUrl("/login")

        }
        else{
          alert(res.message)
        }
    },
    err=>{
      console.log(err)
      alert("Something went wrong in registration")
    })
  }

  ngOnInit(): void {
  }
}
