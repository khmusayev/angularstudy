export class Job {
    id: number;
    startDate: string;
    endDate: string;
    company: string;
	position: string;
	description: string;
	
	constructor(theId: number, theCompany: string, thePosition: string, theStartDate: string, theEndDate: string, theDescription: string) { 
		this.id = theId;
		this.startDate = theStartDate;
		this.endDate = theEndDate;
		this.company = theCompany;
		this.position = thePosition;
		this.description = theDescription; 
	}

}