import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent implements OnInit{

  id:number=0;
  account:Account=new Account();
  successMsg:string="";
  errorMsg:string="";
  orgAmt:number=0;

  constructor(private accountService:AccountService,
              private route:ActivatedRoute,
              private router:Router){}
  
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
   
    this.accountService.getAccountById(this.id).subscribe((data)=>{
      console.log(data);
       console.log("hello");
      this.orgAmt=data.balance;
      this.account=data;
    },
  (error)=>{
    console.log("error");
    console.log(error);
  })
  }

  withdraw(){
    if(this.isValidAmount(this.account.balance,this.orgAmt)){
     this.accountService.withdraw(this.id,this.account.balance).subscribe((data)=>{
      console.log(data);
      this.account=data;
      this.successMsg="Withdraw Successfully!"
      setTimeout(()=>{
        this.router.navigate(["/accounts"]);
      },2000)
      
     })
  }else{
    
      setTimeout(()=>{
       this.errorMsg="";
       this.router.navigate(["/accounts"]);
      },2000)
  }
}



  isValidAmount(ammount:number,orgAmt:number):boolean{
    const remaining=orgAmt - ammount;
    if(ammount>1000000){
      this.errorMsg="Withdraw Ammount is Restricted Above 100000";
      return false;
     }else if(ammount > orgAmt){
       this.errorMsg="Insufficient Balance!";
       return false;
     }else if(remaining < 1000){
       this.errorMsg="Required Ammount in Bank is 1000";
       return false;
     }


    return true;
  }
}
