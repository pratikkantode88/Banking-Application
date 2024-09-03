import { Component } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  constructor(private userAuthService:UserAuthService,
    private router:Router){}


public isLoggedIn(){
return  this.userAuthService.isLoggedIn();
}

public logout(){
this.userAuthService.clear();
this.router.navigate(["/login"]);
}
}
