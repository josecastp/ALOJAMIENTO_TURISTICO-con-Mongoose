const uri = "mongodb+srv://root:root@cluster0.kmx55.mongodb.net/foap-apartments?retryWrites=true&w=majority";

const mongoose = require('mongoose');

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