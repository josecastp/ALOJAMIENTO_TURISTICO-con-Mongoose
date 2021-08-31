
const mongoose = require('mongoose');

//Los esquemas sirven como guias de la estructura de los documentos. Los necesitamos para la creación del modelo. Así que antes de utilizar los modelos de manera apropiada, es necesario definir sus esquemas.
// Definimos el esquema:
// Campo: tipoValor
const apartmentSchema = new mongoose.Schema({ //Tipos de datos: https://mongoosejs.com/docs/schematypes.html
    title: String,
    price: Number,
    size: Number,
    mainPhoto: String,
    dinningroomPhoto: String,
    bathroomPhoto: String,
    bedroomPhoto: String,
    fechaBaja: Date, 
    bathrooms: Number,
    AC: Boolean,
    heating: Boolean, 
    wheelchair: Boolean,
    tv: Boolean,
    kitchen: Boolean,
    wifi: Boolean,
    persons: Number,
    bedrooms: Number,
    beds: Number,
    description: String,
    rules: String,
    province: String,
    city: String,
    latitude: String,
    longitude: String     
})
// Asociarlo a un modelo/colección
// 'apartments'
// Te crea una instancia de la clase Model. Se encarga de relacionar el esquema del dominio (creado mediante código JavaScript); con la colección 'Apartments' en base de datos.
// Establece los mecanismos suficientes y necesarios para ofrecer las mismas funcionalidad que el driver nativo de mongodb
const Apartment = mongoose.model('Apartments', apartmentSchema);

// Exportar el MODELO
module.exports = Apartment;


//Exportar FORMA B:
//module.exports = mongoose.model('Apartments', apartmentSchema);
