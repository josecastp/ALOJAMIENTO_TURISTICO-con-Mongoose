const express = require('express');

const DataBase = require('./database/database');

const adminRoutes = require('./routes/AdminApartmentRoutes') //require requiere por parametro un string. Es un objeto router.

const userRoutes = require('./routes/UserApartmentRoutes') //require requiere por parametro un string. Es un objeto router.

const app = express();

app.set('view engine', 'ejs');  //sistema de plantilas por defecto(evitamos poner en cada uno de los endpoints .ejs)


// Damos acceso a la carpeta 'public' para que cualquier cliente pueda hacer un GET
// a cualquier recurso que se ubique en ella (hojas de estilo CSS, imágenes, documentos PDF...)
app.use(express.static('public'));

app.use(express.urlencoded({extended: false})); //Poder gestionar las peticiones post del protocolo http

app.use('/', userRoutes); //En este caso no prefija rutas

app.use('/admin', adminRoutes); //Middleware:predefine lo que empiece por /admin, lo que pasas ira a buscar la ruta si exite una que coincida en './routes/AdminApartmentRoutes'. Ahorramos de escribirlo en cada endpoint

app.use((req, res)=>{ 
    // res.status(404).send("<h1>Error 404: Esta página no existe</h1>");
    res.status(404).sendFile(__dirname + "/404.html")
})

// TODO: No tendriamos que empezar a escuchar en el puerto 3000 hasta que no nos hemos conecado a la base de datos. EL lunes lo arreglamos
DataBase.connect(function(){
    app.listen(3000);
});

