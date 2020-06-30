import joi from 'joi'
import UserService from '../service/userService.js'

// Schema for user registration
const userRegistrationSchema = joi.object().keys({

    // firstName is required
    firstName: joi.string().required(),

    // lastName is required
    lastName: joi.string().required(),

    // email is required
    email: joi.string().email().required(),

    // password is required
    password: joi.string().required(),

    // password is required
    confirmPassword: joi.string().required(),

    topic: joi.string().required()

});
// Controller class for handling user operation
class UserController {

    constructor() {
    }

    async registerUser(request, response) {

        try {
            // validating the user registration body against the schema
            joi.validate(request.body, userRegistrationSchema, async (err, value) => {

                //If schema validation fails, send error response
                if (err) {
                    console.log(err)
                    var message = err;
                    response.render('error', { error: message });
                }
            })

            // If schema validation passes, proceed with the service call.

            let userObj = {
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: request.body.password
            }

            console.log(`Requesting service method for creation of the user: ${userObj.email}`)

            let userService = new UserService()
            let responseObj = await userService.createUser(userObj)

            console.log(`responseObj from service:`, responseObj)

            var message = responseObj.info + 'Please click on login to continue.'
            response.render('success', { success: message });

        } catch (e) {
            console.error(`Error in registering the user: ${request.body.email}`)
            console.error(e)
            response.render('error', { error: e.error });
        }
    }
}
export default UserController