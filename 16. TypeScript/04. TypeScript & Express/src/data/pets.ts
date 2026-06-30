export type Pet = {
  id: number,
  name: string,
  species: string,
  breed: string,
  age: number,
  adopted: boolean,
  intakeDate: Date,
  adoptionDate?: Date,
  medicalRecord: {
    vaccinations: string[],
    weightKg: number,
    microchipId: null | string
  },
  photo: string
}


export const pets: Pet[] = [  
    {  
        id: 1,  
        name: "Bella",  
        species: "Dog",  
        breed: "Border Collie",  
        age: 3,  
        adopted: false,  
        intakeDate: new Date("2024-06-15"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Distemper", "Parvovirus"],  
            weightKg: 18.4,  
            microchipId: null  
        },  
        photo: "bella-border-collie.jpg"  
    },  
    {  
        id: 2,  
        name: "Milo",  
        species: "Cat",  
        breed: "Siamese",  
        age: 2,  
        adopted: true,  
        intakeDate: new Date("2024-01-01"),  
        adoptionDate: new Date("2024-02-15"),  
        medicalRecord: {  
            vaccinations: ["Rabies"],  
            weightKg: 5.2,  
            microchipId: "ABC123"  
        },  
        photo: "milo-siamese.jpg"  
    },  
    {  
        id: 3,  
        name: "Thumper",  
        species: "Rabbit",  
        breed: "Mini Lop",  
        age: 1,  
        adopted: false,  
        intakeDate: new Date("2024-07-20"),  
        medicalRecord: {  
            vaccinations: ["Myxomatosis"],  
            weightKg: 2.1,  
            microchipId: null  
        },  
        photo: "thumper-mini-lop.jpg"  
    },  
    {  
        id: 4,  
        name: "Charlie",  
        species: "Dog",  
        breed: "Labrador Retriever",  
        age: 4,  
        adopted: true,  
        intakeDate: new Date("2023-11-15"),  
        adoptionDate: new Date("2024-01-05"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Distemper", "Parvovirus"],  
            weightKg: 28.6,  
            microchipId: "LAB456"  
        },  
        photo: "charlie-labrador.jpg"  
    },  
    {  
        id: 5,  
        name: "Luna",  
        species: "Cat",  
        breed: "Maine Coon",  
        age: 5,  
        adopted: false,  
        intakeDate: new Date("2024-03-10"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Feline Distemper"],  
            weightKg: 6.8,  
            microchipId: null  
        },  
        photo: "luna-maine-coon.jpg"  
    },  
    {  
        id: 6,  
        name: "Oscar",  
        species: "Dog",  
        breed: "Beagle",  
        age: 2,  
        adopted: true,  
        intakeDate: new Date("2024-04-05"),  
        adoptionDate: new Date("2024-04-25"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Parvovirus"],  
            weightKg: 10.5,  
            microchipId: "BEA789"  
        },  
        photo: "oscar-beagle.jpg"  
    },  
    {  
        id: 7,  
        name: "Clover",  
        species: "Rabbit",  
        breed: "Netherland Dwarf",  
        age: 2,  
        adopted: false,  
        intakeDate: new Date("2024-08-02"),  
        medicalRecord: {  
            vaccinations: ["Myxomatosis"],  
            weightKg: 1.5,  
            microchipId: null  
        },  
        photo: "clover-netherland-dwarf.jpg"  
    },  
    {  
        id: 8,  
        name: "Rocky",  
        species: "Dog",  
        breed: "German Shepherd",  
        age: 6,  
        adopted: true,  
        intakeDate: new Date("2023-12-12"),  
        adoptionDate: new Date("2024-02-01"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Distemper", "Parvovirus"],  
            weightKg: 34.2,  
            microchipId: "GER321"  
        },  
        photo: "rocky-german-shepherd.jpg"  
    },  
    {  
        id: 9,  
        name: "Willow",  
        species: "Cat",  
        breed: "Bengal",  
        age: 1,  
        adopted: false,  
        intakeDate: new Date("2024-05-18"),  
        medicalRecord: {  
            vaccinations: ["Rabies"],  
            weightKg: 4.3,  
            microchipId: null  
        },  
        photo: "willow-bengal.jpg"  
    },  
    {  
        id: 10,  
        name: "Hazel",  
        species: "Rabbit",  
        breed: "Flemish Giant",  
        age: 4,  
        adopted: true,  
        intakeDate: new Date("2024-02-10"),  
        adoptionDate: new Date("2024-03-20"),  
        medicalRecord: {  
            vaccinations: ["Myxomatosis"],  
            weightKg: 6.4,  
            microchipId: "RAB654"  
        },  
        photo: "hazel-flemish-giant.jpg"  
    },  
    {  
        id: 11,  
        name: "Buddy",  
        species: "Dog",  
        breed: "Golden Retriever",  
        age: 3,  
        adopted: false,  
        intakeDate: new Date("2024-06-05"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Distemper", "Parvovirus"],  
            weightKg: 30.1,  
            microchipId: null  
        },  
        photo: "buddy-golden-retriever.jpg"  
    },  
    {  
        id: 12,  
        name: "Zara",  
        species: "Cat",  
        breed: "Persian",  
        age: 7,  
        adopted: true,  
        intakeDate: new Date("2023-09-25"),  
        adoptionDate: new Date("2023-11-10"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Feline Distemper"],  
            weightKg: 5.9,  
            microchipId: "PER852"  
        },  
        photo: "zara-persian.jpg"  
    },  
    {  
        id: 13,  
        name: "Max",  
        species: "Dog",  
        breed: "French Bulldog",  
        age: 2,  
        adopted: false,  
        intakeDate: new Date("2024-07-08"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Parvovirus"],  
            weightKg: 11.7,  
            microchipId: null  
        },  
        photo: "max-french-bulldog.jpg"  
    },  
    {  
        id: 14,  
        name: "Daisy",  
        species: "Rabbit",  
        breed: "English Angora",  
        age: 3,  
        adopted: false,  
        intakeDate: new Date("2024-05-25"),  
        medicalRecord: {  
            vaccinations: ["Myxomatosis"],  
            weightKg: 3.2,  
            microchipId: null  
        },  
        photo: "daisy-english-angora.jpg"  
    },  
    {  
        id: 15,  
        name: "Simba",  
        species: "Cat",  
        breed: "Ragdoll",  
        age: 4,  
        adopted: true,  
        intakeDate: new Date("2024-02-20"),  
        adoptionDate: new Date("2024-04-05"),  
        medicalRecord: {  
            vaccinations: ["Rabies", "Feline Distemper"],  
            weightKg: 6.1,  
            microchipId: "RAG963"  
        },  
        photo: "simba-ragdoll.jpg"  
    }  
];  
