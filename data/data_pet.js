var getRandIdPet = Math.floor(Math.random()*(999-100+1)+100);
var getRandIdCategory = Math.floor(Math.random()*(999-100+1)+100);
var getRandIdTags = Math.floor(Math.random()*(999-100+1)+100);


export const addPet = ({
    "id": getRandIdPet,
    "category": {
      "id": getRandIdCategory,
      "name": "testing_pet"
    },
    "name": `macan`+`${getRandIdPet}`,
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": getRandIdTags,
        "name": "pet"
      }
    ],
    "status": "available"
 });


 export const invalidInputAddPet = ({
    "name": 'macan',
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": getRandIdTags,
        "name": "pet"
      }
    ],
    "status": "available"
 });


export const editDatPet = ({
    "id": 9999,
    "category": {
        "id": 0,
        "name": "testing_pet"
    },
    "name": `kucing`+`${getRandIdPet}`,
    "photoUrls": [
        "string"
    ],
    "tags": [
        {
            "id": 0,
            "name": "snooky"
        }
    ],
    "status": "available"
});

export const deletePet = ({
    "id":100002
});