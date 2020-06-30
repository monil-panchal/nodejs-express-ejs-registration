import chai from 'chai';
import UserService from '../src/service/userService.js'

const expect = chai.expect
const assert = chai.assert
const userService = new UserService()

// Integration testing to create new user in the system

describe('createUser() test', () => {

    let user = {
        firstName: 'Monil',
        lastName: 'Panchal',
        email: 'Monilw.panchal@dal.ca',
        password: 'password'
    }

    it('user should be created ', async () => {
        let number = Math.floor(Math.random() * Math.floor(10000000000000));

        user.email = number + user.email
        let responseObj = await userService.createUser(user)

        expect(responseObj)
        expect(responseObj.info).to.be.a('string')
        assert.isNotNull(responseObj)
        expect(responseObj.info).to.equal(`User with email : ${user.email} is created successfully.`);
    });
});