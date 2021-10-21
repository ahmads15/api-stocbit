import * as endpoints from '../endpoints/endpointPet';
import * as data from '../data/data_pet';
import 'regenerator-runtime/runtime';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const request = require('supertest');
const baseUrl = 'https://petstore.swagger.io';


var getIdPet;

let response;
describe('User success order,find order, delete order', () => {
    test('User success order with new pet', async () => {
        let getDataPet = data.addPet;
        response = await endpoints.addPet(getDataPet); 
        getIdPet = response.body.id;
        console.log(response.body);
        expect(response.status).toEqual(200);
        let responseStore = await request(baseUrl)
        .post('/v2/store/order')
        .send({
            "id": 10,
            "petId":getIdPet,
            "quantity": 3,
            "shipDate": "2021-10-20T16:05:34.675Z",
            "status": "adopted",
            "complete": true
          })
          expect(responseStore.body.id).toEqual(10);
          expect(responseStore.body.petId).toEqual(getIdPet);
          expect(responseStore.body.quantity).toEqual(3);
          expect(responseStore.body.status).toContain("adopted");
    },10000);

    test('User success find order byId', async () => {
        response = await request(baseUrl)
            .get('/v2/pet/store/order/10');
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(getIdPet);
        expect(responseStore.body.id).toEqual(10);
        expect(responseStore.body.petId).toEqual(getIdPet);
        expect(responseStore.body.quantity).toEqual(3);
        expect(responseStore.body.status).toContain("adopted")
    },20000);

    test('User success delete order', async () => {
        response = await request(baseUrl)
            .delete('/v2/pet/store/order/10');
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('10');
    },20000);

});