import { find, remove } from "lodash";

const peopleArr = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const carsArr = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = `
type People {
    id: String!
    firstName: String!
    lastName: String!
}

type Cars {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
}

type PersonWithCars {
  person: People
  cars:[Cars]
}


type Query {
  person(id: String!): People
  people: [People]  
  car(id: String!): Cars
  cars: [Cars]
  carsByPersonId(personId: String!): [Cars]
  personWithCars(id: String!): PersonWithCars
}

type Mutation {
    addPerson(id:String!, firstName: String!, lastName: String!): People!
    updatePerson(id: String!, firstName: String!, lastName: String!): People!
    removePerson(id: String!): People!

    addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!) : Cars!
    updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!) : Cars!
    removeCar(id: String!) : Cars!    
}
`;

const resolvers = {
  Query: {
    people: () => peopleArr,
    person(root, args) {
      return find(peopleArr, { id: args.id });
    },
    cars: () => carsArr,
    /* carsforPerson(root, args) {
      return carsArr.filter((car) => car.personId === args.personId);
    }, */
    personWithCars(root, args) {
      const person = find(peopleArr, { id: args.id });
      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }

      const personCars = carsArr.filter((car) => car.personId === args.id);

      return {
        person,
        cars: personCars,
      };
    },
  },

  Mutation: {
    addPerson: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      peopleArr.push(newContact);
      return newContact;
    },
    updatePerson: (root, args) => {
      const person = find(peopleArr, { id: args.id });
      if (!person) {
        throw new Error(`Could not find a person with id ${args.id}`);
      }
      person.firstName = args.firstName;
      person.lastName = args.lastName;
      return person;
    },
    removePerson: (root, args) => {
      const removePerson = find(peopleArr, { id: args.id });
      if (!removePerson) {
        throw new Error(`Could not find a person with id ${args.id}`);
      }
      remove(peopleArr, (p) => {
        return p.id === removePerson.id;
      });
      return removePerson;
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      carsArr.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const carIndex = carsArr.findIndex((car) => car.id === args.id);
      if (carIndex === -1) {
        throw new Error(`Could not find a car with id ${args.id}`);
      }
      carsArr[carIndex] = {
        ...carsArr[carIndex],
        ...(args.year && { year: args.year }),
        ...(args.make && { make: args.make }),
        ...(args.model && { model: args.model }),
        ...(args.price && { price: args.price }),
        // ...(args.personId && { personId: args.personId }),
      };
      return carsArr[carIndex];
    },
    removeCar: (root, args) => {
      const carIndex = carsArr.findIndex((car) => car.id === args.id);
      if (carIndex === -1) {
        throw new Error(`Could not find a car with id ${args.id}`);
      }
      const removedCar = carsArr.splice(carIndex, 1)[0];
      return removedCar;
    },
  },
};

export { typeDefs, resolvers };
