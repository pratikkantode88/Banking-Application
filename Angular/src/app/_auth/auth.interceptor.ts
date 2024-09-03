import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userauthservice:UserAuthService,private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(req.headers.get("No-Auth")==="True"){
        return next.handle(req.clone());
    }
    
    const token=this.userauthservice.getToken();

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
       console.log(error.status);
       if(error.status===401){
          this.router.navigate(['/login']);
       }else if(error.status===403){
        this.router.navigate(['/forbidden'])
       }
      return throwError("some thing is wrong!");
      })
    );
  }

}
