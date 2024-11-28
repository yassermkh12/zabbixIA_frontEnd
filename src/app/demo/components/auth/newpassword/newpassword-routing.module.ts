import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewPasswordComponent } from './newpassword.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NewPasswordComponent },
        { path: 'forgotpassword', loadChildren: () => import('./../forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
        { path: 'login', loadChildren: () => import('./../login/login.module').then(m => m.LoginModule) },
    ])],
    exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
