const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    facturapiId: String
    Name: String!
    email: String!
    password: String!
    address: Address
    registrationDate: String!
    userTipe: String!
    rfc: String!
    PaymentMethod: String!
    tax_system: String!
  }

 

  type Address {
    street: String!
    exterior_number: String!
    interior_number: String
    neighborhood: String!
    zip: String!
    city: String!
    state: String!
    country: String!
  }

  input AddressInput {
    street: String!
    exterior_number: String!
    interior_number: String
    neighborhood: String!
    zip: String!
    city: String!
    state: String!
    country: String!
  }

  type Query {
  users: [User]
  user(facturapiId: String!): User
  userById(_id: ID!): User
}


  type Mutation {
    createUser(
      Name: String!,
      email: String!,
      password: String!,
      address: AddressInput!,
      registrationDate: String!,
      userTipe: String!,
      PaymentMethod: String!,
      rfc: String!,
      tax_system: String!
    ): User

    deleteUser(facturapiId: String!): User
  }
`;

module.exports = typeDefs;
