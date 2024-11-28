import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './demo/interceptors/auth.interceptor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
