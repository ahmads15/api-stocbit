import * as endpoints from '../endpoints/endpointPet';
import * as data from '../data/data_user';
import 'regenerator-runtime/runtime';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const request = require('supertest');
const baseUrl = 'https://petstore.swagger.io';


var getUsernameUser;
var getIdUser;

let response;
describe('User success create,read, update and delete user', () => {
    test('User success create a new user', async () => {
        let getDataUser = data.addUser;
        response = await endpoints.addUser(getDataUser); 
        getIdUser = response.body.id;
        getUsernameUser = response.body.username;
        console.log(response.body);
        expect(response.status).toEqual(200);
    },20000);

    test('User success update user', async () => {
        response = await request(baseUrl)
            .put(`/v2/user/`+data.addUser.username)
            .send({
                "id": 299,
                "username": 'test_aji1',
                "firstName": "ahmad_edit",
                "lastName": "sutarji_edit",
                "email": "ahmadsutarji_edit@yopmail.com",
                "password": "123Ser*_",
                "phone": "08138162525",
                "userStatus": 0
              })
        expect(response.status).toEqual(200);
    },20000);

    test('User success find user byUsername', async () => {
        response = await request(baseUrl)
            .get(`/v2/user/`+data.addUser.username);
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual("test_aji1");
        expect(response.body.firstName).toEqual("ahmad_edit");
        expect(response.body.lastName).toEqual("sutarji_edit");
        expect(response.body.email).toEqual("ahmadsutarji_edit@yopmail.com");
        console.log(response.body.username);
    },50000);

    test('User success login and logout', async () => {
        response = await request(baseUrl)
            .get(`/v2/user/login?username=`+data.addUser.username+`&password=`+data.addUser.password);
        expect(response.body.message).toContain("logged in user");
        response = await request(baseUrl)
            .get('/v2/user/logout')
        expect(response.status).toEqual(200);
        expect(response.body.message).toContain("ok");
    },10000);

    test('User success delete user', async () => {
        response = await request(baseUrl)
            .delete(`/v2/user/`+data.addUser.username);
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('test_aji1');
    },10000);

});