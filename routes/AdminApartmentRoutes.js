const express = require('express');

const router = express.Router();//Este objeto permite registrar rutas.

const Apartment = require('../models/ApartmentModel');

//Creamos CLASE Tools para evitar repetir métodos:
class Tools{
    static async mostrarApartamentos(req, res){
        //Recuperamos todos los documentos que NO tienen fecha de baja;
        //Los "eliminados" tienen fecha de baja, por lo que no se muestran:
        const allApartments = await Apartment.find({ fechaBaja: null});
        res.render('index.ejs', { 
            apartments: allApartments,
            admin :true
            })
        }
}

// Vamos a registrar todas las rutas que tienen que ver con la manipulación de los apartamentos por parte de un usuario de tipo 'Administrador'

router.get('/',(req, res)=> {
  //Mostramos todos los apartamentos:
    Tools.mostrarApartamentos(req,res);
})

//MOSTRAR add-apartment:
router.get('/add-new', (req, res) => {
    res.render('add-apartment',{
        apartment: {},//Pasamos objeto vacio,si no da error en campos <%= apartment.xxx %> de add-apartment
        admin:true
    });
})

//AÑADIR O MODIFICAR apartamento:
router.post('/add-new', async (req, res) => {
    
    //Recuperamos todos los campos del formulario:
    const title = req.body.title;
    const price = req.body.price;
    const size = req.body.size;
    //Fotografías:
    const mainPhoto = req.body.mainPhoto;
    const dinningroomPhoto = req.body.dinningroomPhoto;
    const bathroomPhoto = req.body.bathroomPhoto;
    const bedroomPhoto = req.body.bedroomPhoto; 
    //Fecha baja
    const fechaBaja = req.body.fechaBaja;
    //Services:
    const wifi = req.body.wifi;
    const wheelchair = req.body.wheelchair;
    const tv = req.body.tv;
    const heating = req.body.heating;
    const AC = req.body.AC;
    const kitchen  = req.body.kitchen;
    //Features
    const bathrooms = req.body.bathrooms;
    const bedrooms = req.body.bedrooms;
    const beds = req.body.beds;
    const persons = req.body.persons;
    const description = req.body.description;
    const rules = req.body.rules;
    //Location:
    const province = req.body.province;
    const city = req.body.city;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    //Cargamos el valor de idApartment...si viene en el body, si no, es nuevo:
    const idApartment = req.body.idApartment;
    //Comprobamos si recibimos un idApartment significa que queremos modificar el apartamento. En caso contrario, insertar un documento nuevo.
    if (idApartment) {
        // Recuperamos el document con la IdApartment
        const apartment = await Apartment.findById(idApartment);
        //Modificamos el apartamento mediante una comanda de mongoose:
        //await apartment.updateOne({title:title},{price:price},{size:size},{mainPhoto:mainPhoto});
        await apartment.updateOne({title:title},{price:price},{size:size},{mainPhoto:mainPhoto},     {dinningroomPhoto:dinningroomPhoto},{bathroomPhoto:bathroomPhoto}, {bedroomPhoto:bedroomPhoto}, {fechaBaja:fechaBaja}, {bathrooms:bathrooms}, {AC:AC}, {heating:heating}, {wheelchair:wheelchair}, {tv:tv}, {kitchen:kitchen}, {wifi:wifi}, {bedrooms:bedrooms}, {beds:beds}, {persons:persons}, {description:description}, {rules:rules}, {province:province}, {city:city}, {latitude:latitude}, {longitude:longitude});
       //Mostramos todos los apartamentos:
       return Tools.mostrarApartamentos(req,res);
    }

    // Usamos el modelo Apartment para insertar un nuevo documento en la BBDD
   const apartment = new Apartment({
        title,
        price,
        size,
        mainPhoto,
        dinningroomPhoto,
        bathroomPhoto,
        bedroomPhoto,
        bathrooms,
        fechaBaja,
        AC,
        heating,
        wheelchair,
        tv,
        kitchen,
        wifi,
        persons,
        bedrooms,
        beds,       
        description,
        rules,
        province,
        city,
        latitude,
        longitude

    });
    //Insertamos nuevo documento en la BBDD
    await apartment.save();

   //Mostramos todos los apartamentos:
   return Tools.mostrarApartamentos(req,res);
   
})

//BORRAR (no mostrar) apartamentos:
router.get('/apartment/:idApartment/delete', async (req, res) => {
    //Recuperar _id de la URL:
    const idApartment = req.params.idApartment;
    // buscar el apartamento en la colección Apartments por su _id:
    const apartment = await Apartment.findById(idApartment);
    //Asignamos la fecha actual:
    apartment.fechaBaja = Date(); 
    await apartment.save();
    console.log("apartamento eliminado")
    //Mostramos todos los apartamentos:
    Tools.mostrarApartamentos(req,res);
})


//MOSTRAR todos los apartamentos:
router.get('/apartments', (req,res)=> {
    //Mostramos todos los apartamentos:
    Tools.mostrarApartamentos(req,res);

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

module.exports = router; //Exportamos el modulo(variable router, que es un objeto) que importaremos en la app principalres