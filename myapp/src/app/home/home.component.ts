import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
	users: User[] = [];
	clickedOnEdu: boolean = false;
	clickedOnCareer: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
		private userService: UserService,
		private route: ActivatedRoute
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
		});
		this.route.queryParams.subscribe(params => {
			if(params["clickedOnCareer"] != null) {
				this.clickedOnEdu = params["clickedOnEdu"];
				this.clickedOnCareer = params["clickedOnCareer"];
			}
		});
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
	}
	
	clickOnEdu() {
		this.clickedOnEdu = true;
		this.clickedOnCareer = false;
	}

	clickOnCareer() {
		this.clickedOnEdu = false;
		this.clickedOnCareer = true;
	}
}