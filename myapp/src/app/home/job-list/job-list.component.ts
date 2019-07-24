import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/job';
import { JobService } from 'src/app/_services/job.service';
import { Router, NavigationExtras } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services';
import { ConfirmDialogService } from 'src/app/_services/confirmDialog.service';  

@Component({
	selector: 'app-job-list',
	templateUrl: './job-list.component.html',
	styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
	jobs: Job[];

	constructor(private router: Router, private jobService: JobService,
		private alertService: AlertService,  private confirmDialogService: ConfirmDialogService) {
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
				"startDate": job.startDate,
				"description": job.description,
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
					let navigationExtras: NavigationExtras = {
						queryParams: {
							"clickedOnEdu": false,
							"clickedOnCareer": true,
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
	
	showDialog(job: Job) {  
	var ms = this;
    this.confirmDialogService.confirmThis("Do you really want to delete this job entry?", function () {  
      ms.delete(job);
      alert("Yes clicked");  
    }, function () {  
      alert("No clicked");  
    })  
  }  

}
