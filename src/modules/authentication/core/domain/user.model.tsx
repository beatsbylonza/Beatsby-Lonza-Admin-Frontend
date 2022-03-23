export default interface UserModel{

    /* MongoDB default objectId */
    _id ?: string;

	email: String,
	username: { type: String, required: true },
	password: { type: String, required: true },

	firstName: { type: String, required: true },
	middleName: { type: String, required: true },
	lastName: { type: String, required: true },
}