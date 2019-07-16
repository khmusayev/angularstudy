import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/_models/edu';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { EduService } from 'src/app/_services/edu.service';

@Component({
  selector: 'app-addedu',
  templateUrl: './addedu.component.html',
  styleUrls: ['./addedu.component.css']
})
export class AddeduComponent implements OnInit {
    addeduform: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	public edu: Education;
	
  constructor(
        private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private eduService: EduService,
		private alertService: AlertService
  ) { 
  // redirect to home if already logged in
		if (!this.eduService.currentUserValue) {
			this.router.navigate(['/']);
		}
		this.route.queryParams.subscribe(params => {
			if (params["id"] != null) {
				this.edu = new Education(params["id"], params["university"], params["faculty"], params["startDate"], params["endDate"], params["description"]);
			}
			else {
				this.edu = new Education(-1, '', '', '', '', '');
			}
			console.log(this.edu);
		});
  }

  	ngOnInit() {
		this.addeduform = this.formBuilder.group({
			university: [this.edu.university, Validators.required],
			faculty: [this.edu.faculty, Validators.required],
			startDate: [this.edu.startDate, Validators.required],
			endDate: [this.edu.endDate, Validators.required],
			description: [this.edu.description]
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}
	
	// convenience getter for easy access to form fields
	get f() { return this.addeduform.controls; }


	onSubmit() {
		console.log(this.edu);
		console.log('###################################');
		console.log('###################################');
		console.log('###################################');
		console.log('###################################');
		console.log('###################################');
		this.submitted = true;

		// stop here if form is invalid
		if (this.addeduform.invalid) {
			return;
		}

		this.loading = true;
		this.edu = new Education(this.edu.id, this.f.university.value, this.f.faculty.value, this.f.startDate.value, this.f.endDate.value, this.f.description.value);
		this.eduService.addEducation(this.edu)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
					let navigationExtras: NavigationExtras = {
						queryParams: {
							"clickedOnEdu": true,
							"clickedOnCareer": false,
						}
					};
					this.router.navigate([this.returnUrl], navigationExtras);
					console.log(data);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
					console.log(error);
				});
	}
}
