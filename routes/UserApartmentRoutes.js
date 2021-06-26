const express = require('express');

const router = express.Router();//Este objeto permite registrar rutas.

const Apartment = require('../models/ApartmentModel');

// Vamos a registrar todas las rutas que tienen que ver con la manipulación de los apartamentos por parte de un usuario de tipo 'Administrador'
router.get('/', async (req, res)=> {
    // Recuperamos todos los documentos que NO tienen fecha de baja (los "eliminados" tienen fecha de baja)
    const allApartments = await Apartment.find({ fechaBaja: null});
    res.render('index.ejs', {
        apartments: allApartments,
        admin: false
    })
})


//MOSTRAR TODOS los apartamentos:
router.get('/apartments',async (req,res)=> {   
    // Recuperamos todos los documentos que NO tienen fecha de baja (los "eliminados" tienen fecha de baja)
    const allApartments = await Apartment.find({ fechaBaja: null});
    res.render('index.ejs', {
        apartments: allApartments,
        admin:false
    })

})

//Mostrar apartamento por ID**
//apartmentoId sera el valor del campo "_id" .Nos enriquece el request con el objeto params
router.get('/apartment/:apartamentoId', async (req, res)=>{  
    console.log("Mostrar por ID:   ", req.params.apartamentoId);//Params incluye el objeto apartamentoID
 
    //1.hacer una consulta al apartamento por esta ID
    const valorId =  await Apartment.findById(req.params.apartamentoId); // utilizar findById //AYUDA:  geeksforgeeks.org/mongoose-findbyid-function/
    
    //2. renderizar nueva vista detalle.js pasandole unicamente este apartamento
    res.render('detalles.ejs', { //render es un metodo que tiene como primer parametro la plamtilla y como segundo un objeto con todas las variables que le queremos paar a la vista
        apartment: valorId, //le pasamos a la vista  una variable que se llama apartment, cuyo valor es el documento recuperado de la BBDD
        reservado:false,//Para no mostrar el mennsaje de reservado
        admin:false //le pasamos a la vista  una variable que se llama admin, cuyo valor es un booleano de valor false.
    }) 

})

module.exports = router; //Exportamos el modulo(variable router, que es un objeto) que importaremos en la app principal