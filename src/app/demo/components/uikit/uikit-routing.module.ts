import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
        { path: '**', redirectTo: '/notfound' },
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
