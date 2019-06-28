import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/_models/job';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { JobService } from 'src/app/_services/job.service';


@Component({
	selector: 'app-addjob',
	templateUrl: './addjob.component.html',
	styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
	addjobform: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	public job: Job;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private jobService: JobService,
		private alertService: AlertService
	) {
		// redirect to home if already logged in
		if (!this.jobService.currentUserValue) {
			this.router.navigate(['/']);
		}
		this.route.queryParams.subscribe(params => {
			if (params["id"] != null) {
				this.job = new Job(params["id"], params["company"], params["position"], params["startDate"], params["endDate"], params["description"]);
			}
			else {
				this.job = new Job(-1, '', '', '', '', '');
			}
			console.log(this.job);
		});
	}

	ngOnInit() {
		this.addjobform = this.formBuilder.group({
			company: [this.job.company, Validators.required],
			position: [this.job.position, Validators.required],
			startDate: [this.job.startDate, Validators.required],
			endDate: [this.job.endDate, Validators.required],
			description: [this.job.description]
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience getter for easy access to form fields
	get f() { return this.addjobform.controls; }

	onSubmit() {
		console.log(this.job);
		console.log('###################################');
		console.log('###################################');
		console.log('###################################');
		console.log('###################################');
		console.log('###################################');
		this.submitted = true;

		// stop here if form is invalid
		if (this.addjobform.invalid) {
			return;
		}

		this.loading = true;
		this.job = new Job(this.job.id, this.f.company.value, this.f.position.value, this.f.startDate.value, this.f.endDate.value, this.f.description.value);
		this.jobService.addJob(this.job)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
					let navigationExtras: NavigationExtras = {
						queryParams: {
							"clickedOnEdu": false,
							"clickedOnCareer": true,
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
