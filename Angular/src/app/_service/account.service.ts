import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../account';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient:HttpClient,
              private userauthservice:UserAuthService) { }

  requestHeader = new HttpHeaders(
        {"No-Auth":"True"}
    );
              
  private BASE_URL="http://localhost:8080/account";

  private LOGIN_URL="http://localhost:8080";


  login(username:string,password:string){
    return this.httpClient.post(this.LOGIN_URL+"/user/login",{username,password},{headers:this.requestHeader})
 }

  public roleMatch(allowedRoles:any):any{
    let isMatch=false;
    const userRoles:any=this.userauthservice.getRoles();
  
    if(userRoles != null && userRoles){
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<allowedRoles.length;j++){
          if(userRoles[i].roleName === allowedRoles[j]){
          isMatch=true;
          return isMatch;
        }else{
          return isMatch;
        }
      }
    }
  }
  }

  getAllAccounts():Observable<Account[]>{
   return this.httpClient.get<Account[]>(`${this.BASE_URL}`);
  }

  createAccount(account:Account):Observable<Account>{
    return this.httpClient.post<Account>(`${this.BASE_URL}`+"/save",account);
  }

  getAccountById(id:number):Observable<Account>{
  return  this.httpClient.get<Account>(`${this.BASE_URL}/getById/${id}`);
  }

  deposit(id:number,ammount:number):Observable<Account>{
    const request={ammount};
     return this.httpClient.put<Account>(`${this.BASE_URL}/deposit/${id}`,request);
  }

  withdraw(id:number,ammount:number):Observable<Account>{
    const request={ammount};
     return this.httpClient.put<Account>(`${this.BASE_URL}/withdraw/${id}`,request);
  }

  delete(id:number):Observable<Account>{
    return this.httpClient.delete<Account>(`${this.BASE_URL}/${id}`);
  }
}
