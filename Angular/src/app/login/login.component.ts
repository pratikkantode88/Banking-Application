import { Component } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   
  constructor(private accountService:AccountService,
    private userAuthService:UserAuthService,
    private router:Router){}

    isAdmin=true;

username:string="";
password:string="";

login(){
console.log("username : "+this.username+" , password : "+this.password)
this.accountService.login(this.username,this.password).subscribe((data:any)=>{
this.userAuthService.setRoles(data.user.role);
this.userAuthService.setToken(data.jwtToken);

const role=data.user.role[0].roleName;
if(role==="admin"){
this.router.navigate(["/admin"]);
}
},
(error)=>{
console.log(error);

this.isAdmin=false;
  setTimeout(()=>{
    this.isAdmin=true;
  },2000)
}
)

}
}
