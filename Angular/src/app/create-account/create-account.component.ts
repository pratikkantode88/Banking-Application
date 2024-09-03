import { Component } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Account } from '../account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  accountCreated=false;
  account:Account=new Account();

  constructor(private accountService:AccountService,private router:Router){}

  saveAccount(){
    this.accountService.createAccount(this.account).subscribe((data)=>{
      console.log(data);
      this.accountCreated=true;
      setTimeout(()=>{
        this.router.navigate(["/accounts"]);
      },2000)
      
    },
    (error)=>{
      console.log(error);
    }
  )
  }
}
