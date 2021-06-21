
const mongoose = require('mongoose');

//Los esquemas sirven como guias de la estructura de los documentos. Estos son necesitados para la creación del modelo. Así que antes de utilizar los modelos de manera apropiada, es necesario definir sus esquemas.
// Definimos el esquema:
// Campos: title, price, size, mainPhoto
const apartmentSchema = new mongoose.Schema({
    title: String,
    price: Number,
    size: Number,
    mainPhoto: String,
    fechaBaja: Date
    //Falta incluir resto de campos/tipos -> Modelo de datos de la aplicacioón en teans
    
})
// Asociarlo a un modelo/colección
// 'apartments'
const Apartment = mongoose.model('Apartments', apartmentSchema);

// Exportar el MODELO
module.exports = Apartment;