import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent implements OnInit{

  id:number=0;
  account:Account=new Account();

  constructor(private accountService:AccountService,
              private route:ActivatedRoute){}

  ngOnInit(): void {
     this.id=this.route.snapshot.params["id"];
     this.accountService.getAccountById(this.id).subscribe((data)=>{
       this.account=data;
     })
  }

  



}
