import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { JobListComponent } from './home/job-list/job-list.component';
import { JobComponent } from './home/job-list/job/job.component';
import { AddjobComponent } from './home/job-list/addjob/addjob.component';
import { EduListComponent } from './home/edu-list/edu-list.component';
import { AddeduComponent } from './home/edu-list/addedu/addedu.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/_services/confirmDialog.service';  


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        JobListComponent,
        JobComponent,
        AddjobComponent,
        EduListComponent,
        AddeduComponent,
        ConfirmDialogComponent,
    ],
    exports: [  
        ConfirmDialogComponent  
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider,
        ConfirmDialogService  
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }