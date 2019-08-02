export class Contact {
    id: number;
    address: string;
    email: string;
    phone: string;
	
	constructor(theId: number, theAddress: string, theEmail: string, thePhone: string) { 
		this.id = theId;
		this.address = theAddress;
		this.email = theEmail;
		this.phone = thePhone;
	}

}