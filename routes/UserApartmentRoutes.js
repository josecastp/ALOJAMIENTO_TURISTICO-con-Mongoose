const express = require('express');

const router = express.Router();//Este objeto permite registrar rutas.

const Apartment = require('../models/ApartmentModel');

//MOSTRAR TODOS los apartamentos:
// Vamos a registrar todas las rutas que tienen que ver con la manipulación de los apartamentos por parte de un usuario de tipo 'User'
router.get('/', async (req, res)=> {
    // Recuperamos todos los documentos que NO tienen fecha de baja (los "eliminados" tienen fecha de baja)
    const allApartments = await Apartment.find({ fechaBaja: null});
    res.render('index.ejs', {
        apartments: allApartments,
        admin: false
    })
})


//VISTA DETALLADA APARTAMENTO: 
//Mostrar apartamento por ID**. apartmentoId sera el valor del campo "_id" .Nos enriquece el request con el objeto params
router.get('/apartment/:apartamentoId', async (req, res)=>{  
    console.log("Mostrar por ID:   ", req.params.apartamentoId);//Params incluye el objeto apartamentoID
 
    //1.hacer una consulta al apartamento por esta ID
    const valorId =  await Apartment.findById(req.params.apartamentoId); // utilizar findById //AYUDA:  geeksforgeeks.org/mongoose-findbyid-function/
    const allApartments = await Apartment.find({ fechaBaja: null});///////////////////
    //2. renderizar nueva vista detalle.js pasandole unicamente este apartamento
    res.render('detalles.ejs', { //render es un metodo que tiene como primer parametro la plamtilla y como segundo un objeto con todas las variables que le queremos paar a la vista
        apartment: valorId, //le pasamos a la vista  una variable que se llama apartment, cuyo valor es el documento recuperado de la BBDD
        reservado:false,//Para no mostrar el mensaje de reservado
        apartments: allApartments,
        admin:false //le pasamos a la vista  una variable que se llama admin, cuyo valor es un booleano de valor false.
    }) 

})

//FILTRAR (sólo funciona para numero de personas!!)
router.get('/search', async (req, res) => {
    // 1. Mirar si está informado el campo 'price'
    // 2. Si lo está, al hacer la consulta de todos los apartamentos disponibles a través de Mongoose; añadir el filtro (es decir, todos los apartamentos cuyo 'price' es menor o igual al valor que me han pasado en la QueryString)
    // Renderizar la vista
    
    const { persons } = req.query;
    const { province } = req.query;
    const { city } = req.query;

    let query = {};
    let filters = {};

    //Filtramos por numero de personas(debe tener capacidad el apartamento):
    if (persons) {
        query.persons = { $gte: persons };
        filters.persons = persons;

    }else if(province){
       query.province= province;
       console.log("filtrado por provincia", query.province)
       filters.province = province;
    }else if(city){
        console.log("Se filtra por ciudad: ", city)
        query.city = city;
        filters.city = city;
    }

    // if (capacity) ... hacer lo mismo
    // if (city) ... igual

    //const allApartments = await Apartment.find(query)
    const allApartments = await Apartment.find( {$and: [query,{ fechaBaja: null}]});
                          //db.apartments.find( {$and: [{price:{ $lte: 60 }},{ fechaBaja: null}]}).pretty();
                          //db.apartments.find( {$and: [{persons:{ $gte: 6 }},{ fechaBaja: null}]}).pretty();
                          //db.apartments.find( {$and: [{city:Marganell},{ fechaBaja: null}]}).pretty();
                          //db.apartments.find({province: "Cuenca"});

    res.render('index.ejs', {
        apartments: allApartments,
        admin: false,
        filters : filters
    })
})



module.exports = router; //Exportamos el modulo(variable router, que es un objeto) que importaremos en la app principal