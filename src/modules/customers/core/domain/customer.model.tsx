export interface CustomerModel {

    _id: string;
    email: string;

    firstName: string;
    lastName: string;
    middleName: string;

    contactNumber: string;

    street: string;
    city: string;
    state: string;
    zipCode: string;

    date?: any;

}