import mysqlConnection from '../connection/db-connection.js'
import bcrypt from 'bcrypt';

// Service class for handling user operation
class UserService {

    constructor() {
    }

    async createUser(user) {

        // hasing the password using bcrypt
        let securePassword = await bcrypt.hash(user.password, 10)
        console.log(securePassword)

        return new Promise(function (resolve, reject) {

            try {
                let newUser = {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    password: securePassword
                }

                console.log(`Requesting creation of the user: ${newUser.email}`)

                // MySQL DB query
                let insertQuery = 'INSERT INTO user SET ?';

                // MySQL query execution
                mysqlConnection.query(insertQuery, newUser, async function (err, rows) {
                    if (err) {
                        console.error('row: ' + rows)
                        console.error(err)
                        let err_response = {
                            error: `Cannot register user with email: ${newUser.email}. Please try again`,
                            messsage: err.sqlMessage
                        };

                        reject(err_response)
                    } else {
                        console.log(`User with email : ${newUser.email} is created successfully.`)

                        let responseObj = {
                            info: `User with email : ${newUser.email} is created successfully.`,
                            data: newUser
                        };

                        console.log(`responseObj in service class`, responseObj)
                        resolve(responseObj)
                    }
                })
            }
            catch (e) {
                console.error(`Error in creating the user: ${newUser.email}`)
                console.error(e)
                throw Error(e)
            }
        })
    }
}
export default UserService