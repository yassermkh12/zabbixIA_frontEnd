import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerificationComponent } from './verification.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VerificationComponent },
        { path: 'newpassword', loadChildren: () => import('./../newpassword/newpassword.module').then(m => m.NewPasswordModule) },
        { path: 'forgotpassword', loadChildren: () => import('./../forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
    ])],
    exports: [RouterModule]
})
export class VerificationRoutingModule { }