import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/_models/contact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

    editcontactform: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	public contact: Contact;
	
  constructor(
        private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private contactService: ContactService,
		private alertService: AlertService
  ) { 
  // redirect to home if already logged in
		if (!this.contactService.currentUserValue) {
			this.router.navigate(['/']);
		}
		this.route.queryParams.subscribe(params => {
			if (params["id"] != null) {
				this.contact = new Contact(params["id"], params["address"], params["email"], params["phone"]);
			}
			else {
				this.contact = new Contact(-1, '', '', '');
			}
		});
  }

  	ngOnInit() {
		this.editcontactform = this.formBuilder.group({
			address: [this.contact.address, Validators.required],
			email: [this.contact.email, Validators.required],
			phone: [this.contact.phone, Validators.required]
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}
	
	// convenience getter for easy access to form fields
	get f() { return this.editcontactform.controls; }


	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.editcontactform.invalid) {
			return;
		}

		this.loading = true;
		this.contact = new Contact(this.contact.id, this.f.address.value, this.f.email.value, this.f.phone.value);
		this.contactService.editContact(this.contact)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
					let navigationExtras: NavigationExtras = {
						queryParams: {
						    "clickedOnAboutMe": true,
							"clickedOnEdu": false,
							"clickedOnCareer": false,
						}
					};
					this.router.navigate([this.returnUrl], navigationExtras);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
					console.log(error);
				});
	}
	
	backToHomePage() {
		this.router.navigate(['/']);
	}

}
