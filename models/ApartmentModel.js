
const mongoose = require('mongoose');

//Los esquemas sirven como guias de la estructura de los documentos. Estos son necesitados para la creación del modelo. Así que antes de utilizar los modelos de manera apropiada, es necesario definir sus esquemas.
// Definimos el esquema:
// Campos: tipoValor
const apartmentSchema = new mongoose.Schema({ //Tipos de datos: https://mongoosejs.com/docs/schematypes.html
    title: String,
    price: Number,
    size: Number,
    //Fotografías (de momento sólo 1):
    mainPhoto: String,
    /*
    dinningroom: String,
    bathroom: String,
    bedroom: String,
    */
    fechaBaja: Date, 
    bathrooms: Number,
    services: {
        bathroom: Boolean,
        telphone: Boolean,
        wifi: Boolean,
        tv: Boolean,
        heating: Boolean,
        AC: Boolean,
        kitchen: Boolean
    },
    rooms: Number,
    beds: Number,
    persons: Number,
    description: String,
    rules: String,
   
    location: {
        province: String,
        city: String,
       
    }



    

})
// Asociarlo a un modelo/colección
// 'apartments'
// Te crea una instancia de la clase Model. Se encarga de relacionar el esquema del dominio (creado mediante código JavaScript); con la colección 'Apartments' en base de datos.
// Establece los mecanismos suficientes y necesarios para ofrecer las mismas funcionalidad que el driver nativo de mongodb
const Apartment = mongoose.model('Apartments', apartmentSchema);

// Exportar el MODELO
module.exports = Apartment;
