const {gql} = require('apollo-server');

const typeDefs = gql`

enum Category {
    ELECTRONICS
    CLOTHING
    FOOD
    TOYS
  }

type Carrito {
    _id: ID!,
    items: [items]!,
    cliente: String!,
    status: String!,
    fechaCreacion: String!,
    fechaCierre: String,
}

type Product {
    _id: ID!,
    name: String!,
    description: String,
    price: Float,
    category: Category!,
    brand: String,
    stock: Int,
    creationDate: String,
    imgs: [String]
}

type items {
    productoId: String!,
    price: Float,
    name: String,
    cantidad: Int,
    subtotal: Float
}


 type User {
    _id: ID!,
    Name: String!,
    email: String!,
    password: String!,
    address: Address!,
    registrationDate: String!,
    userTipe: String!,
    rfc: String!,
    PaymentMethod: String!,
    tax_system: String!,
}

input ItemsInput {   
    productoId: String!,
    price: Float,
    cantidad: Int,
    subtotal: Float,
    total: Float
}



type Query {
    carritos: [Carrito],
    carrito(_id: ID!): Carrito
    user(userId: ID!): User
    product(_id: ID!): Product
}

type Mutation {
    createCarrito(
        items: [ItemsInput!]!, 
        cliente: String!,
        status: String!,
        fechaCreacion: String!
        ): Carrito

     updateProduct(
        _id: ID!,
        stock: Int!
        ): Product
    
    updateCarrito(
        _id: ID!,
        fechaCierre: String!,
        status: String
        ): Carrito

    deleteCarrito(_id: ID!): Carrito
}

`;

module.exports = typeDefs ;