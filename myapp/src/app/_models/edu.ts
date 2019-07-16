export class Education {
    id: number;
    startDate: string;
    endDate: string;
    university: string;
	faculty: string;
	description: string;
	
	constructor(theId: number, theUniversity: string, theFaculty: string, theStartDate: string, theEndDate: string, theDescription: string) { 
		this.id = theId;
		this.startDate = theStartDate;
		this.endDate = theEndDate;
		this.university = theUniversity;
		this.faculty = theFaculty;
		this.description = theDescription; 
	}

}