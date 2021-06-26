//Definimos el esquema para la reserva:
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkIn: Date,
    checkOut: Date,
    idApartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartments' } //El tipo va a ser un ObjectId y referencia a la coleccion apartments (heredará la _id de la coleccion apartents) 
})

// Lo asociamos a un modelo/colección
// 'bookings'
const Booking = mongoose.model ('Bookings', bookingSchema);

//Exportamos el MODELO:
module.exports = Booking;

//Exportar FORMA B:
//module.exports = mongoose.model('Bookings', bookingSchema);