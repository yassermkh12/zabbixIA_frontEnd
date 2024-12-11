import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { authenticationGuard } from './demo/guards/authentication.guard';
import { loginGuard } from './demo/guards/login.guard';
import { UserComponent } from './demo/components/user/user.component';
import { RoleComponent } from './demo/components/role/role.component';
import { ConversationComponent } from './demo/components/conversation/conversation.component';
import { ProblemComponent } from './demo/components/problem/problem.component';
import { HostComponent } from './demo/components/host/host.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    // { 
    //     path: '', 
    //     redirectTo: 'auth/login',  // Rediriger vers la page de login par défaut
    //     pathMatch: 'full' 
    // },
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./demo/components/apps/chat/chat.app.module').then(m => m.ChatAppModule) },
            { path: 'uikit',loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'apps',loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) },
            { path: 'user', component: UserComponent},
            { path: 'role', component: RoleComponent},
            { path: 'conversation', component: ConversationComponent},
            { path: 'problem', component: ProblemComponent},
            { path: 'host', component: HostComponent}
        ],
        // canActivate:[authenticationGuard]
    },
    { path: 'apps',loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) },
    { path: 'auth', 
        data: { breadcrumb: 'Auth' }, 
        loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule),
        canActivate:[loginGuard]
 },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
