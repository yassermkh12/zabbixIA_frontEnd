import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgotpassword.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ForgotPasswordComponent },
        { path: 'verification', loadChildren: () => import('./../verification/verification.module').then(m => m.VerificationModule) }
    ])],
    exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }