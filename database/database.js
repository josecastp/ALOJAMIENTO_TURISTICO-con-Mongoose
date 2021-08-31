const mongoose = require('mongoose');

//Escondemos la conexión en las variables del entorno:
const {MONGO_PASSWORD, MONGO_USER, MONGO_DB, MONGO_HOST} = process.env //Requerimos variables de entorno
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;

class DataBase {
    // callback. "Oye, invócame cuando hayas acabado lo que tienes que hacer."
    static connect(cb) {
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
            if (err) throw err;
            console.log("Conectados a la base de datos correctamente.")
            cb(); //'cb' es de tipo Function !
        })
    }
}

module.exports = DataBase;