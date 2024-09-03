import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  
  public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  
  public getRoles():[]{
    let get=localStorage.getItem('roles');

    if(!get){
      return [];
    }

    return JSON.parse(get);
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken)
  }

  public getToken():string{
    return localStorage.getItem("jwtToken")||"";
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }
}
