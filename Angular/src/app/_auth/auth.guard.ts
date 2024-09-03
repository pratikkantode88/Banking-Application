import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';
import { AccountService } from '../_service/account.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate{
  
  constructor(private userauthservice:UserAuthService,
              private router:Router,
              private accountservice:AccountService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.userauthservice.getToken()!=null){
       const role=route.data["roles"] as Array<string>;
       console.log("role : "+role);
       if(role){
          const match=this.accountservice.roleMatch(role);

          if(match){
            return true;
          }else{
            this.router.navigate(["/forbidden"]);
            return false;
          }
       }
    }
    this.router.navigate(["/login"]);
    return false;
  }
  
}

