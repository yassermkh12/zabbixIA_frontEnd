import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'chat', data: { breadcrumb: 'Chat' }, loadChildren: () => import('./chat/chat.app.module').then(m => m.ChatAppModule) },
        { path: '**', redirectTo: '/notfound' },
    ])],
    exports: [RouterModule]
})
export class AppsRoutingModule { }
