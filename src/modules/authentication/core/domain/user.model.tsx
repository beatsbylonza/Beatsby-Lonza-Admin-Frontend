export default interface UserModel{

    /* MongoDB default objectId */
    _id: string;

	email: string,
	username: string,
	password: string,

	firstName: string,
	middleName: string,
	lastName: string,

	contactNumber: string,
	
	address: {
		city: string,
		state: string,
		street: string,
		zipcode: string,
	}
}