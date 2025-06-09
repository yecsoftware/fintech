import { Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutsComponent } from './pages/layouts/layouts.component';
import { HomeComponent } from './pages/home/home.component';
import { ServiceOrnek2Component } from './pages/service-ornek-2/service-ornek-2.component';
import { ServiceOrnek1Component } from './pages/service-ornek-1/service-ornek-1.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { logoutcheckGuard } from './logoutcheck.guard';
import { AppComponent } from './app.component';
import { NgcontentComponent } from './pages/ngcontent/ngcontent.component';
import { UCardComponent } from './components/u-card/u-card.component';
import { UserListComponent } from './pages/userlist/userlist.component';
import { UExpansionPanelComponent } from './components/u-expansion-panel/u-expansion-panel.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { UseroperationsComponent } from './pages/useroperations/useroperations.component';
import { RegisterComponent } from './pages/register/register.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

import { authGuard, authChildGuard } from './auth.guard'; 
import { roleGuard } from './roleguard.guard';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { VerifyComponent } from './pages/verify/verify.component';

export const homeRoute: Route = { path: '', component: AppComponent };

export const routes: Routes = [
    { path: '', component: IntroductionComponent },
    { path: 'expander', component: UExpansionPanelComponent },
    { path: 'ucard', component: UCardComponent },
    { path: 'userlist', component: UserListComponent },
    { path: 'ngcontent', component: NgcontentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify', component: VerifyComponent},

    {
      path: 'layout',
      component: LayoutsComponent,
      canActivateChild: [authChildGuard],
      children: [
        { path: '', component: AppComponent }, // homeRoute
        { path: 'home', component: HomeComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard] },
        { path: 'useroperations', component: UseroperationsComponent },
        {path: 'unauthorized', component: UnauthorizedComponent},
        { path: 'dashboard/:params', component: DashboardComponent },
        { path: 'transaction', component: TransactionComponent },
        {path: 'customer', component: CustomerComponent},
        

      ],
    },
    {
      path: 'service-ornek-1',
      component: ServiceOrnek1Component,
      canActivate: [authGuard],
    },
  
    // 🔁 redirect tanımları
    { path:  'unauthorized', redirectTo: 'layout/unauthorized', pathMatch: 'full' },
    { path: 'dashboard', redirectTo: 'layout/dashboard', pathMatch: 'full' },
    { path: 'home', redirectTo: 'layout/home', pathMatch: 'full' },
    {path: 'useroperations', redirectTo: 'layout/useroperations', pathMatch: 'full'},
    {path: 'transaction', redirectTo: 'layout/transaction', pathMatch: 'full'},
    {path: 'customer', redirectTo: 'layout/customer', pathMatch: 'full'},

  
    // 404 için opsiyonel
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ];
