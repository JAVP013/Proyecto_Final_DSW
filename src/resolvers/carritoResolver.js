const {Query} = require('mongoose');
const carritoService = require('../services/carritoService');

const resolvers = {
    Query: {
        carritos: () => {
            return carritoService.getCarritos();},
        carrito: (_,{_id}) => {
            return carritoService.getCarritoById(_id);}
    },

    Mutation: {
        createCarrito: (_, {cliente, items, status,fechaCreacion}) => {
            return carritoService.createCarrito(cliente, items, status,fechaCreacion);
        },
        updateCarrito: (_, { _id, status ,fechaCierre}) => {
            return carritoService.updateCarrito(_id, status, fechaCierre);
        },
        deleteCarrito: (_, { _id }) => {
            return carritoService.deleteCarrito(_id);
        }
    }
};
module.exports = resolvers