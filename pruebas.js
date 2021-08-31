//Las propiedades de un  objeto  serian la clase
/*Un gato tiene un nombre , edad, si esta vacunado, es un objeto*/
class Gato{
    constructor(nombre, edad, estaVacunado){
        this.nombre=nombre;
        this.edad=edad;
        this.estaVacunado=estaVacunado;
        this.habilidades=[];
        this.especie='felino'
    }
    maullar(){  //Declaramos método
        console.log('miauuu')
    }
    aprender(habilidad){   //Declaramos método
        this.habilidades.push(habilidad)
    }
}

//Crear una instacia de la clase gato ( a pesar de ser una constante, sus propiedades 
//pueden modificarse):
const gato1 = new Gato('Molly', 3, true);
const gato2 = new Gato('Kiko', 7, true);

gato2.maullar()

gato1.aprender('caza ratones')
console.log(gato1)