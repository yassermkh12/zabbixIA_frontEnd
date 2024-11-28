import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterComponent },
        { path: 'login', loadChildren: () => import('./../login/login.module').then(m => m.LoginModule) }
    ])],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }