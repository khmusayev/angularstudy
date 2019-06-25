import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/job';
import { JobService } from 'src/app/_services/job.service';
import { Router, NavigationExtras } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services';
import { MatTableModule } from '@angular/material';

@Component({
	selector: 'app-job-list',
	templateUrl: './job-list.component.html',
	styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
	jobs: Job[];

	constructor(private router: Router, private jobService: JobService,
		private alertService: AlertService) {
		if (!this.jobService.currentUserValue) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
		this.jobService.getJobs()
			.pipe(first())
			.subscribe(
				data => {
					console.log(data);
					this.jobs = data;
					console.log(this.jobs);
					console.log(data);
				},
				error => {
					this.alertService.error(error);
					console.log(error);
				});
	}

	edit(job: Job) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": job.id,
				"company": job.company,
				"position": job.position,
				"endDate": job.endDate,
				"startDate": job.startDate
			}
		};
		this.router.navigate(['/jobs/add'], navigationExtras);
	}

	delete(job: Job) {
		this.jobService.deleteJob(job)
			.pipe(first())
			.subscribe(
				data => {
					console.log(data);
				},
				error => {
					this.alertService.error(error);
					console.log(error);
					this.router.navigate(['/']);
				});
		this.router.navigate(['/']);
	}

}
