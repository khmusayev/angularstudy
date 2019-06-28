import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
	readonly ROOT_URL = 'http://localhost:8083/public/users';
	
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    getById(id: number) {
        return this.http.get(`/users/` + id);
    }

    register(user: User) {
		return this.http.post<any>(this.ROOT_URL + '/register?username=' + user.username + '&password=' + user.password + '&firstName=' + user.firstName+ '&lastName=' + user.lastName, {})
    }

    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }
}