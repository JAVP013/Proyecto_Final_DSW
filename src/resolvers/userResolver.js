const { Query } = require('mongoose');
const userService = require('../services/userServices');

const resolvers = {
    Query: {
        users: () => {
            return userService.getAllUsers();
        },
        user: (_, { facturapiId}) => {
            return userService.getUserById(facturapiId);
        },
        userById: (_, { _id}) => {
            return userService.getUserById(_id);
        }
    }
        ,
    Mutation: {
        createUser: (_, { Name, email, password, address, registrationDate, userTipe, PaymentMethod ,rfc,tax_system}) => {
            return userService.createUser(Name, email, password, address, registrationDate, userTipe, PaymentMethod, rfc,tax_system);
        },
        deleteUser: (_, {facturapiId }) => {
            return userService.deleteUser(facturapiId); ;
        }
        
    }
};

module.exports = resolvers;