import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_CARS = gql`
  query {
    cars {
      id
      make
      model
      personId
      price
      year
    }
  }
`;
export const ADD_CAR = gql`
  mutation AddCar(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: String!
  ) {
    addCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      personId
      price
      year
    }
  }
`;
export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
  ) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price) {
      id
      make
      model
      price
      year
    }
  }
`;
export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      make
      model
      personId
      price
      year
    }
  }
`;

export const GET_CARSFORPERSON = gql`
  query GetCarsForPerson($personId: String!) {
    carsforPerson(personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const GET_PEOPLE_WITH_CARS = gql`
  {
    people {
      id
      firstName
      lastName
      cars {
        id
        make
        model
        personId
        price
        year
      }
    }
  }
`;
