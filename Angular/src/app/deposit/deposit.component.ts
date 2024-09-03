import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../_service/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent implements OnInit {

  id:number=0;
  account:Account=new Account();
  successMsg:string="";
  errorMsg:string="";

  constructor(private accountService:AccountService,
              private route:ActivatedRoute,
              private router:Router){}
  
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.accountService.getAccountById(this.id).subscribe((data)=>{
      this.account=data;
    })
  }

  deposit(){
    if(this.isValidAmount(this.account.balance)){
     this.accountService.deposit(this.id,this.account.balance).subscribe((data)=>{
      this.account=data;
      this.successMsg="Deposit Successfully!"
      setTimeout(()=>{
        this.router.navigate(["/accounts"]);
      },2000)
      
     })
  }else{
    this.errorMsg="Invalid Amount.........Please Enter Valid Amount";
      setTimeout(()=>{
       this.errorMsg="";
      },2000)
  }
}



  isValidAmount(ammount:number):boolean{
    return ammount>0 && ammount<1000000;
  }
}
