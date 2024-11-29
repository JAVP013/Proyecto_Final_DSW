const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    facturapiId: { type: String},
    Name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    tax_system: { type: String, require: true },
    address: {
        street: { type: String, required: true },             // Calle
        exterior_number: { type: String, required: true },    // Número exterior
        interior_number: { type: String },                    // Número interior (si aplica)
        neighborhood: { type: String, required: true },        // Colonia
        zip: { type: String, required: true },           // Código postal
        city: { type: String, required: true },               // Ciudad
        state: { type: String, required: true },              // Estado
        country: { type: String, required: true },            // País
      },
    registrationDate: { type: String, require: true },
    userTipe: { type: String, require: true },
    rfc: { type: String, require: true },
    PaymentMethod: { type: String, require: true, enum: ['Tarjeta', 'Paypal','Bitcoin', 'Tarjeta de Credito'] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;