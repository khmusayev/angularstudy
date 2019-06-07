import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../_models';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
		readonly ROOT_URL = 'http://localhost:8083/public/users';
		readonly ROOT_URL_PRIV = 'http://localhost:8083/users';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
		return this.http.post<any>(this.ROOT_URL + '/login?username=' + username + '&password=' + password, {})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
					localStorage.setItem('users', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
    //let headers = new HttpHeaders({
	//	'Content-Type': 'application/json',
	//	'Authorization': 'Bearer ' + this.currentUserSubject.getValue().token
	// });
	
	let headers = new HttpHeaders();
	// headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('Content-Type', 'application/json');
    // headers.set('Accept', 'application/json');
    headers.set('Authorization', 'Bearer ' + this.currentUserSubject.getValue().token);
	console.log('Bearer ' + this.currentUserSubject.getValue().token);
	console.log(this.ROOT_URL_PRIV + '/logout');
    
//    let options = new RequestOptions({ headers: headers });
		return this.http.get<any>(this.ROOT_URL_PRIV + '/logout', {headers: headers  })
            .pipe(map(loggedOut => {
                // login successful if there's a jwt token in the response
                if (loggedOut) {
                    localStorage.removeItem('currentUser');
                    this.currentUserSubject.next(null);
                }

                return loggedOut;
            }));
    }
}