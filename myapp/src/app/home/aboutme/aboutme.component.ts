import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/_models/contact';
import { ContactService } from 'src/app/_services/contact.service';
import { Router, NavigationExtras } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services';
import { ConfirmDialogService } from 'src/app/_services/confirmDialog.service';  

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  contact: Contact

  constructor(private router: Router, private contactService: ContactService,
		private alertService: AlertService, private confirmDialogService: ConfirmDialogService) {
		if (!this.contactService.currentUserValue) {
			this.router.navigate(['/']);
		}
	}

   ngOnInit() {
		this.contactService.getContact()
			.pipe(first())
			.subscribe(
				data => {
					console.log(data);
					this.contact = data;
					console.log(this.contact);
					console.log(data);
				},
				error => {
					this.alertService.error(error);
					console.log(error);
				});
	}
	
	edit() {
		if(this.contact == null) {
		    this.router.navigate(['/contact/edit']);
		} else {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": this.contact.id,
				"address": this.contact.address,
				"email": this.contact.email,
				"phone": this.contact.phone,
			}
		};
		this.router.navigate(['/contact/edit'], navigationExtras);
		}
	}
	
		delete() {
		this.contactService.deleteContact()
			.pipe(first())
			.subscribe(
				data => {
					console.log(data);
					let navigationExtras: NavigationExtras = {
						queryParams: {
						    "clickedOnAboutMe":true,
							"clickedOnEdu": false,
							"clickedOnCareer": false,
						}
					};
					this.redirectTo('/', navigationExtras);
				},
				error => {
					this.alertService.error(error);
					console.log(error);
				});
	}
	
	redirectTo(uri: string, navigationExtras: NavigationExtras) {
		console.log("REDIRECTING TO HOME!!!!!");
		this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
			this.router.navigate([uri], navigationExtras));
	}
	
	contactExists() {
	return this.contact != null;
	}
	
	showDialog() {  
	var ms = this;
    this.confirmDialogService.confirmThis("Do you really want to delete the contact?", function () {  
      ms.delete();
      alert("Yes clicked");  
    }, function () {  
      alert("No clicked");  
    })  
  }

}
