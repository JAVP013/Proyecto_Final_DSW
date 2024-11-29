// src/index.js
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Importar los esquemas y resolvers
const productTypeDefs = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');
const userTypeDefs = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');
const carritoTypeDefs = require('./schemas/carritoSchema');
const carritoResolvers = require('./resolvers/carritoResolver');


const startServer = async () => {
  // Conectar a MongoDB
  await mongoose.connect('mongodb+srv://admin:admin@carrito.4iszf.mongodb.net/?retryWrites=true&w=majority&appName=CARRITO');
  
  const server = new ApolloServer({ 
    typeDefs: [productTypeDefs, userTypeDefs, carritoTypeDefs],
    resolvers: [productResolvers, userResolvers, carritoResolvers],
  });
  
  server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
  });
};

startServer();
