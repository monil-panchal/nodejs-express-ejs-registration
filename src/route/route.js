import UserController from '../controller/userController.js'
import dotenv from 'dotenv'
dotenv.config()

const routes = (app) => {

    app.route('/')
        .get((request, response) => {
            response.render('registration')
        })

    // Endpoint for rendering the registration page
    app.route('/register')
        .get((request, response) => {
            response.render('registration')
        })

    // Endpoint for redirecting to login application
    app.route('/login/redirect')
        .get((request, response) => {
            response.redirect(process.env.loginApp)
        })

    // POST endpoint for registering the user
    app.route('/register')
        .post(async (request, response) => {
            var userController = new UserController()
            userController.registerUser(request, response)
        });

}
export default routes