const express = require('express'); // 
const {Mongoose} = require('mongoose');
const router = express.Router();

const Booking= require('../models/BookingModel');
const Apartment = require('../models/ApartmentModel');

router.post('/new-reservation', async (req, res)=> {
   

    // 1. Recuperamos los datos de la request a través de req.body(obtenemos los valores que el formulario envía a nuestra API)
     const { checkIn, checkOut, idApartment } = req.body; // Así se recuperan en ES6(mas cómodo)
     
     /* const checkIn = req.body.checkIn;//Recuperar campos url
     const checkOut = req.body.checkOut;
     const idApartment = req.body.idApartment; */

    // 2. Usamos el modelo Booking para insertar un nuevo documento en la BBDD.Le pasamos los valores de los campos recuperados(checkIn,checkOut y idApartment):
    const nuevaReserva = new Booking({
        checkIn,
        checkOut,
        idApartment 
    })
    const resultado = await nuevaReserva.save()//Guardamos la reserva en la BBDD

    //Renderizamos de nuevo el apartamento reservado:
    //Hacemos una consulta al apartamento por esta ID
    const apartment = await Apartment.findById(idApartment);
    console.log("Apartamento reservado: ",apartment);
    
    //Renderizamos nueva vista detalles.js pasandole este apartamento
    res.render('detalles.ejs', { //render es un metodo que tiene como primer parametro la plamtilla y como segundo un objeto con todas las variables que le queremos paar a la vista
        apartment: apartment, //le pasamos a la vista  una variable que se llama apartment, cuyo valor es el documento recuperado de la BBDD
        reservado:true, //Mensaje de confirmacion reserva
        checkIn,
        checkOut,
        admin:false 
    }) 
   
    
    //res.send(`El apartamento ${resultado} ha sido reservado`);

})



//Exportar 
module.exports = router;