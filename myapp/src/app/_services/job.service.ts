import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../_models';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Job } from '../_models/job';

@Injectable({ providedIn: 'root' })
export class JobService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
		readonly ROOT_URL = 'http://localhost:8083/public/users';
		readonly ROOT_URL_PRIV = 'http://localhost:8083/users/jobs';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    updateJob(username: string, password: string) {
		
    }

    addJob(job:Job) {
	
	let headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + this.currentUserSubject.getValue().token);
	console.log('Bearer ' + this.currentUserSubject.getValue().token);
	console.log(this.ROOT_URL_PRIV + '/logout');
    
		return this.http.post<any>(this.ROOT_URL_PRIV, job, {headers: headers  })
            .pipe(map(newJob => {
                if (newJob) {
                    return true
                }
                return false;
            }));
	}
	
	getJobs() {
		let headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + this.currentUserSubject.getValue().token);
	console.log('Bearer ' + this.currentUserSubject.getValue().token);
	console.log(this.ROOT_URL_PRIV + '/logout');
    
		return this.http.get<any>(this.ROOT_URL_PRIV, {headers: headers  })
            .pipe(map(data => {
                if (data) {
                    return data;
                }
                return null;
            }));
	}
}