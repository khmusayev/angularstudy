import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/job';
import { JobService } from 'src/app/_services/job.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services';
import { MatTableModule } from  '@angular/material';

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

}
