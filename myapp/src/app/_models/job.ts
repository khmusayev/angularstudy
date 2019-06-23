export class Job {
    id: number;
    startDate: string;
    endDate: string;
    company: string;
	position: string;
	
	constructor(theId: number, theStartDate: string, theEndDate: string, theCompany: string, thePosition: string) { 
		this.id = theId;
		this.startDate = theStartDate;
		this.endDate = theEndDate;
		this.company = theCompany;
		this.position = thePosition; 
	}

}