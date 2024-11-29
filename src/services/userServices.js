const User = require('../models/userModels');
const facturapi = require('../apis/facturapi');
const { get } = require('mongoose');

module.exports = {
    getAllUsers: async () => {
        return await User.find();
    },
    getUserFactById: async ( facturapiId) => {
        
        return await User.findOne({facturapiId: facturapiId}) ;
    },
    getUserById: async ( _id) => {
        
        return await User.findOne({_id: _id}) ;
    },
    createUser: async (Name, email, password, address, registrationDate, userTipe, PaymentMethod, rfc,tax_system) => {
        const user = new User({ Name, email, password, 
            address, registrationDate, userTipe, PaymentMethod ,rfc,tax_system});

         

        const facturapiUser = 
        await facturapi.createUser(user);

        user.facturapiId = facturapiUser.id;

        
        return await user.save();
    },

    deleteUser: async (facturapiId) => {
        await facturapi.removedCustomer(facturapiId);
        return await User.findByIdAndDelete(facturapiId); ;
    }
}