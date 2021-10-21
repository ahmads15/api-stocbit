import supertest from 'supertest';


const env = require('dotenv').config();

const api = supertest(process.env.API_Endpoint);


// pet
export const addPet =  (data) => api.post('/v2/pet')
    .set('Content-Type', 'application/json')
    .send(data);

export const addPetInvalid =  () => api.post('/v2/pet')
    .set('Content-Type', 'application/json');

export const findPetbyIdInvalid =  () => api.get('/v2/pet/99199')
    .set('Accept','application/json');

export const deletePetInvalid =  () => api.delete('/v2/pet/99199')
    .set('Accept','application/json');


export const updatePetInvalid =  (data) => api.put('/v2/pet/9a999')
    .set('Content-Type', 'application/json')
    .send(data);


// user
export const addUser =  (data) => api.post('/v2/user')
    .set('Content-Type', 'application/json')
    .send(data);

