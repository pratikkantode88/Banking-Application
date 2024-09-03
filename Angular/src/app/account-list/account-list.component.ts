import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Account } from '../account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {

  constructor(private accountService:AccountService,private router:Router){}
  ngOnInit(): void {
    this.getAllAccounts();
  }

  accounts:Account[]=[];
  deleteMsg=false;

  getAllAccounts(){
    this.accountService.getAllAccounts().subscribe((data)=>{
      this.accounts=data;
      console.log(data);
    },
    (error)=>{
      console.log(error);
    }
  )
  }

  deposit(id:number){
    console.log(id);
   this.router.navigate(["/deposit",id]);
  }
  withdraw(id:number){
    console.log(id);
   this.router.navigate(["/withdraw",id]);
  }
  deleteAcc(id:number){
  this.accountService.delete(id).subscribe((data)=>{
    console.log(data);
    this.deleteMsg=true;
    setTimeout(()=>{
      this.deleteMsg=false;
      this.getAllAccounts();
     },2000)

  })
  }

  view(id:number){
    this.router.navigate(["/view",id]);
  }
}
