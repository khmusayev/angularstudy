import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../_models';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Contact } from '../_models/contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	readonly ROOT_URL = 'http://localhost:8083/public/users';
	readonly ROOT_URL_PRIV = 'http://localhost:8083/users/contact';

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	editContact(contact: Contact) {

		let headers = new HttpHeaders();
		headers.set('Authorization', 'Bearer ' + this.currentUserSubject.getValue().token);

		return this.http.post<any>(this.ROOT_URL_PRIV, contact, { headers: headers })
			.pipe(map(newJob => {
				if (newJob) {
					return true
				}
				return false;
			}));
	}

	getContact() {
		let headers = new HttpHeaders();
		headers.set('Authorization', 'Bearer ' + this.currentUserSubject.getValue().token);

		return this.http.get<any>(this.ROOT_URL_PRIV, { headers: headers })
			.pipe(map(data => {
				if (data) {
					return data;
				}
				return null;
			}));
	}

	deleteContact() {
		let headers = new HttpHeaders();
		headers.set('Authorization', 'Bearer ' + this.currentUserSubject.getValue().token);

		return this.http.delete<any>(this.ROOT_URL_PRIV, { headers: headers })
			.pipe(map(data => {
				console.log("We are at NOWHERE!!!");
				if (data) {
					console.log("We are at the RIGHT spot!!!");
					return true;
				}
				console.log("We are at the WRONG spot!!!");
				return false;
			}));
	}
}