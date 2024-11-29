const mongoose = require('mongoose');
const User = require('../models/userModels');
const Carrito = require('../models/carritoModel');
const ProductS = require('../models/productModel');

const carritoService = {
    getCarritos: async () => {
        try {
            const carritos = await Carrito.find();
            return carritos;
        } catch (error) {
            console.error('Error al obtener carritos:', error.message);
            throw new Error('No se pudieron recuperar los carritos.');
        }
    },

    getCarritoById: async (_id) => {
        try {
            const carrito = await Carrito.findById(_id);
            if (!carrito) throw new Error(`No se encontró el carrito con ID ${_id}`);
            return carrito;
        } catch (error) {
            console.error('Error al obtener el carrito:', error.message);
            throw new Error('No se pudo recuperar el carrito solicitado.');
        }
    },

    createCarrito: async (cliente, items, status, fechaCreacion) => {
        const session = await mongoose.startSession(); // Iniciar una sesión de transacción

        try {
            session.startTransaction(); // Iniciar la transacción

            // Verificar si el cliente existe
            const clienteExistente = await User.findById(cliente).session(session);
            if (!clienteExistente) {
                throw new Error('El cliente no existe.');
            }

            // Verificar si los productos existen y calcular el subtotal por producto
            for (let item of items) {
                const productoExistente = await ProductS.findById(item.productoId).session(session);
                
                if (!productoExistente) {
                    throw new Error(`El producto con ID ${item.productoId} no existe.`);
                }

                // Verificar que haya suficiente stock
                const nuevoStock = productoExistente.stock - item.cantidad;
                if (nuevoStock < 0) {
                    throw new Error(`No hay suficiente stock para el producto ${productoExistente.name}`);
                }

                // Actualizar el stock en la base de datos
                await ProductS.findByIdAndUpdate(item.productoId, { stock: nuevoStock }, { session, new: true });

                // Calcular el subtotal del item (precio * cantidad)
                item.price = productoExistente.price;
                item.name = productoExistente.name;
                item.subtotal = productoExistente.price * item.cantidad;
                item.iva =  0.16*item.subtotal;
            }

            // Calcular el total del carrito (sumando los subtotales de cada item)
            const total = items.reduce((acc, item) => acc + item.subtotal, 0);

            // Si todo está correcto, crear el carrito
            const carrito = new Carrito({
                clienteId: cliente,
                items: items,
                total: total,
                status: status,
                fechaCreacion: fechaCreacion
            });
           
            await carrito.save({ session }); // Guardar el carrito en la transacción

            await session.commitTransaction(); // Confirmar la transacción
            return await carrito + console.log('Carrito creado exitosamente', carrito);
        } catch (error) {
            await session.abortTransaction(); // Revertir la transacción en caso de error
            console.error('Error al crear el carrito:', error.message);
            throw new Error('No se pudo crear el carrito. Verifica los datos proporcionados.');
        } finally {
            session.endSession(); // Finalizar la sesión de la transacción
        }
    }
};

module.exports = carritoService;
