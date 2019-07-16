import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { JobListComponent } from './home/job-list/job-list.component';
import { AddjobComponent } from './home/job-list/addjob/addjob.component';
import { AddeduComponent } from './home/edu-list/addedu/addedu.component';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
	{ path: 'jobs', component: JobListComponent },
	{ path: 'jobs/add', component: AddjobComponent },
	{ path: 'edus/add', component: AddeduComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);