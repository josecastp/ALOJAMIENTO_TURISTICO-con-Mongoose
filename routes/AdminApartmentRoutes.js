const express = require('express');

const router = express.Router();//Este objeto permite registrar rutas.

const Apartment = require('../models/ApartmentModel');

// Vamos a registrar todas las rutas que tienen que ver con la manipulación de los apartamentos por parte de un usuario de tipo 'Administrador'

router.get('/', async (req, res)=> {
   // Recuperamos todos los documentos que NO tienen fecha de baja;
//los "eliminados" tienen fecha de baja, por lo que no se muestran:
const allApartments = await Apartment.find({ fechaBaja: null});
res.render('index.ejs', { 
    apartments: allApartments,
    admin :true
    })
})

router.get('/add-new', (req, res) => {
    res.render('add-apartment',{
        apartment: {},//Pasamos objeto vacio,si no da error en campos <%= apartment.xxx %> de add-apartment
        admin:true
    });
})

//AÑADIR O MODIFICAR apartamento
router.post('/add-new', async (req, res) => {
    
    //Recuperamos campos del formulario:
    const title = req.body.title;
    const price = req.body.price;
    const size = req.body.size;
    const mainPhoto = req.body.mainPhoto;

    
    const idApartment = req.body.idApartment;
    // Comprobar si recibimos un idApartment significa que queremos modificar el apartamento. En caso contrario, insertar un documento nuevo.
    if (idApartment) {
        // Realizar un updateOne !!
        const apartment = await Apartment.findById(idApartment);
        //Modificamos el apartamento mediante una comanda de mongoose:
        //await apartment.updateOne({title:title},{price:price},{size:size},{mainPhoto:mainPhoto});
        await apartment.updateOne({title:title, price:price, size:size, mainPhoto:mainPhoto});
        return res.send('Apartamento modificado!');
    }

    else {
        console.log('Es un apartamento nuevo!')
    }

    /* const title = req.body.title;
    const price = req.body.price;
    const size = req.body.size;
    const mainPhoto = req.body.mainPhoto;
   */

   const apartment = new Apartment({
        title,
        price,
        size,
        mainPhoto
    });
    await apartment.save();

   res.send("Apartamento creado.");
   
})

//BORRAR (no mostrar) apartamentos:
// apartment/u34yeurweu3432423/delete --> hacer que el
// apartamento indetificado con el _id: u34yeurweu3432423; ya no esté disponible para alquilar
router.get('/apartment/:idApartment/delete', async (req, res) => {
    //Recuperar _id de la URL:
    const idApartment = req.params.idApartment;
    // buscar el apartamento en la colección Apartments por su _id:
    const apartment = await Apartment.findById(idApartment);
    //Asignamos la fecha actual:
    apartment.fechaBaja = Date();
    await apartment.save();

    res.send(`El apartamento ${idApartment} ha sido dado de baja.`)
})


//MOSTRAR todos los apartamentos:
router.get('/apartments',async (req,res)=> {
// Recuperamos todos los documentos que NO tienen fecha de baja;
//los "eliminados" tienen fecha de baja, por lo que no se muestran:
const allApartments = await Apartment.find({ fechaBaja: null});
    res.render('index.ejs', { 
        apartments: allApartments,
        admin :true
    })

})


//EDITAR apartamentos:
router.get('/apartment/:idApartment/edit', async (req, res)=>{
    //Recuperar _id de la URL:
    const idApartment = req.params.idApartment;
    // buscar el apartamento en la colección Apartments por su _id:
    const apartment = await Apartment.findById(idApartment);
    res.send(`Editar apartamento ${idApartment}.`)
})


//RECUPERAR _id del apartamento para tratarlo individualmente:
//Se nos enriquece el request con el objeto params:
router.get('/apartment/:idAparment', async (req, res)=>{  
    //TEST:
    console.log("Objeto del documento: ", req.params) //Params incluye el objeto apartamentoID
    console.log("Mostrar por ID- valor:   ", req.params.idAparment); //valor del campo _id de la coleccion
    
    //Hacemos una consulta al apartamento por esta ID. ApartamentoID es un palabra
    const apartment =  await Apartment.findById(req.params.idAparment); //este metodo nos pasará el apartamento que coincida con esta id; utilizamosfindById //AYUDA:  geeksforgeeks.org/mongoose-findbyid-function/
   
    //2. Renderizamos add-apartments , pasandole unicamente este apartamento
    res.render('add-apartment', { //render es un metodo. Tiene como primer parametro la plantilla y como segundo, un objeto con todas las variables que le queremos pasar a la vista
        apartment: apartment, //le pasamos a la vista  una variable que se llama apartment, cuyo valor es el documento recuperado de la BBDD.
        admin:true //le pasamos a la vista  una variable que se llama admin, cuyo valor es un booleano de valor true(es administrador)
    }) 
})

module.exports = router; //Exportamos el modulo(variable router, que es un objeto) que importaremos en la app principal