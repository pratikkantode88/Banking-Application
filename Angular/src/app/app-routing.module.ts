import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  {path:"admin",component:AdminComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"forbidden",component:ForbiddenComponent},
  {path:"accounts",component:AccountListComponent,canActivate:[authGuard],data:{roles:["admin"]}},
  {path:"add_account",component:CreateAccountComponent,canActivate:[authGuard],data:{roles:["admin"]}},
  {path:"deposit/:id",component:DepositComponent,canActivate:[authGuard],data:{roles:["admin"]}},
  {path:"withdraw/:id",component:WithdrawComponent,canActivate:[authGuard],data:{roles:["admin"]}},
  {path:"view/:id",component:ViewAccountComponent,canActivate:[authGuard],data:{roles:["admin"]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
