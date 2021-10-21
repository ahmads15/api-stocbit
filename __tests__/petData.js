import * as endpoints from '../endpoints/endpointPet';
import * as data from '../data/data_pet';
import 'regenerator-runtime/runtime';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const request = require('supertest');
const baseUrl = 'https://petstore.swagger.io';


var getIdPet;
var getIdCategory;
var getIdTags;


let response;
describe('User success create,read, update and delete pet', () => {
    test('User success create a new pet', async () => {
        let getDataPet = data.addPet;
        response = await endpoints.addPet(getDataPet); 
        getIdPet = response.body.id;
        getIdCategory = response.body.category.id;
        getIdTags = response.body.tags[0].id;
        console.log(response.body);
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(getIdPet);
        expect(response.body.category.id).toEqual(getIdCategory);
        expect(response.body.category.name).toEqual("testing_pet"); 
        expect(response.body.name).toEqual(`macan`+`${getIdPet}`);
        expect(response.body.tags[0].id).toEqual(getIdTags);
        expect(response.body.tags[0].name).toEqual("pet"); 
        expect(response.body.status).toEqual("available");
    },20000);

    test('User success update existing pet', async () => {
        response = await request(baseUrl)
            .put('/v2/pet/')
            .send({
                "id": getIdPet,
                "category": {
                    "id": getIdCategory,
                    "name": "testing_pet"
                },
                "name": `macan`+`${getIdPet}`,
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": getIdTags,
                        "name": "pet_edit"
                    }
                ],
                "status": "sold"
            })
        expect(response.status).toEqual(200);
        expect(response.body.tags[0].name).toEqual("pet_edit");
        expect(response.body.status).toEqual("sold");
    },20000);

    test('User success find pet byId', async () => {
        response = await request(baseUrl)
            .get(`/v2/pet/`+`${getIdPet}`);
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(getIdPet);
        expect(response.body.category.id).toEqual(getIdCategory);
        expect(response.body.category.name).toEqual("testing_pet"); 
        expect(response.body.name).toEqual(`macan`+`${getIdPet}`);
        expect(response.body.tags[0].id).toEqual(getIdTags);
        expect(response.body.tags[0].name).toEqual("pet_edit");
        expect(response.body.status).toEqual("sold");
        console.log(response.body);
    },20000);

    test('User success delete pet', async () => {
        response = await request(baseUrl)
            .delete(`/v2/pet/`+`${getIdPet}`);
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual(`${getIdPet}`);
    },20000);
});


describe('User verify negative case API Pet', () => {
    test('User can see error not found add pet', async () => {
        let getDataPet = data.invalidInputAddPet;
        response = await endpoints.addPetInvalid(getDataPet); 
        expect(response.status).toEqual(405);
        expect(response.body.message).toEqual("no data");
    },10000);
    test('User can see error data not found edit pet', async () => {
        let getDataEditPet = data.editDatPet;
        response = await endpoints.updatePetInvalid(getDataEditPet); 
        expect(response.status).toEqual(405);

    },10000);
    test('User can see error data not found find pet', async () => {
        response = await endpoints.findPetbyIdInvalid(); 
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual('Pet not found');

    },10000);
    test('User can see error data not found delete pet', async () => {
        response = await endpoints.deletePetInvalid(); 
        expect(response.status).toEqual(404);
    },10000);
});