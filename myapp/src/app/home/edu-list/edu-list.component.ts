import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/_models/edu';
import { EduService } from 'src/app/_services/edu.service';
import { Router, NavigationExtras } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services';
import { ConfirmDialogService } from 'src/app/_services/confirmDialog.service';  

@Component({
  selector: 'app-edu-list',
  templateUrl: './edu-list.component.html',
  styleUrls: ['./edu-list.component.css']
})
export class EduListComponent implements OnInit {
	edus: Education[]

  constructor(private router: Router, private eduService: EduService,
		private alertService: AlertService, private confirmDialogService: ConfirmDialogService) {
		if (!this.eduService.currentUserValue) {
			this.router.navigate(['/']);
		}
	}

  ngOnInit() {
		this.eduService.getEdus()
			.pipe(first())
			.subscribe(
				data => {
					console.log(data);
					this.edus = data;
					console.log(this.edus);
					console.log(data);
				},
				error => {
					this.alertService.error(error);
					console.log(error);
				});
	}
	
	edit(edu: Education) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": edu.id,
				"university": edu.university,
				"faculty": edu.faculty,
				"endDate": edu.endDate,
				"startDate": edu.startDate,
				"description": edu.description,
			}
		};
		this.router.navigate(['/edus/edit'], navigationExtras);
	}
	
		delete(edu: Education) {
		this.eduService.deleteEdu(edu)
			.pipe(first())
			.subscribe(
				data => {
					console.log(data);
					let navigationExtras: NavigationExtras = {
						queryParams: {
							"clickedOnEdu": true,
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
	
	showDialog(edu: Education) {  
	var ms = this;
    this.confirmDialogService.confirmThis("Do you really want to delete this education entry?", function () {  
      ms.delete(edu);
      alert("Yes clicked");  
    }, function () {  
      alert("No clicked");  
    })  
  }

}
