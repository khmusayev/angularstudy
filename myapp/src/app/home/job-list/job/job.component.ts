import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/_models/job';
import { Router, NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
	@Input() job: Job;
	constructor(private router: Router) { }

	ngOnInit() {
	}

	edit() {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": this.job.id,
				"company": this.job.company,
				"position": this.job.position,
				"endDate": this.job.endDate,
				"startDate": this.job.startDate
			}
		};
		this.router.navigate(['/jobs/add'], navigationExtras);
	}

}
