import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent },
        { path: 'register', loadChildren: () => import('./../register/register.module').then(m => m.RegisterModule) },
        { path: 'forgotpassword', loadChildren: () => import('./../forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) }
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
