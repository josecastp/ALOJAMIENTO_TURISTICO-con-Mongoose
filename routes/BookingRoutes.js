const express = require('express'); // 
const {Mongoose} = require('mongoose');
const router = express.Router();

const Booking= require('../models/BookingModel');

router.post('/new-reservation', async (req, res)=> {
    console.log("Estamos en newReservation--------------")
    // 1. Recuperamos los datos de la request a través de req.body(obtenemos los valores que el formulario envía a nuestra API)
     const { checkIn, checkOut, idApartment } = req.body; // Así se recuperan en ES6(mas cómodo)
     console.log("Estamos en newReservation(2)------->idApartment", idApartment)
    /*  const checkIn = req.body.checkIn;
     const checkOut = req.body.checkOut;
     const idApartment = req.body.idApartment; */

    // 2. Usamos el modelo Booking para insertar un nuevo documento en la BBDD.Le pasamos los valores de los campos recuperados(checkIn,checkOut y idApartment):
    const nuevaReserva = new Booking({
        checkIn,
        checkOut,
        idApartment 
    })
    const resultado = await nuevaReserva.save()
    res.send(resultado)
})



//Exportar 
module.exports = router;