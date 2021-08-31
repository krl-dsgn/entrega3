//Definir la clase planta
class Planta {
    constructor(nombre, altura, tipo, precio, img){
        this.nombre = nombre;
        this.altura = altura;
        this.tipo = tipo;
        this.precio = precio;
        if (!img){
            this.img = 'planta-por-defecto.png';
        }else {
            this.img = img;
        }
        
    };

    toString(){
        return `${this.nombre} - $${this.precio}`
    }
    
    iva(){
        return parseFloat(this.precio) * 0.19;
    }

    precioTotal(){
        return parseFloat(this.precio) + parseFloat(this.iva());
    }
}

 //JSON-arreglo por defecto
 let arreglo_de_plantas = [
    new Planta('Monstera', 130, 'Interior', 10000, 'monstera.jpeg'),
    new Planta('Gomero', 60, 'Interior', 6000, 'gomero.jpeg'),
    new Planta('Singonio', 130, 'Exterior', 12000, 'singonio.jpeg'),
];
//Encontrar arreglo de plantas guardado en local storage
const arreglo_de_plantas_guardadas = JSON.parse(localStorage.getItem('arreglo_de_plantas'))

//Seleccionar el arreglo guardado o el por defecto
const plantas_a_mostrar = Array.isArray(arreglo_de_plantas_guardadas)? 
    arreglo_de_plantas_guardadas: 
    arreglo_de_plantas;

$( document ).ready(function() {
     //DOM al cargar la página
    actualizarContadorPlantas(plantas_a_mostrar.length)
    mostrarPlantas(plantas_a_mostrar);
});

//Elemento contenedor planta
function crearElementoPlanta () {
    const elementoPlanta = $('<div></div>');
    elementoPlanta.addClass('producto');
    return elementoPlanta
}

//Elemento HTML imagen planta
function crearImagenPlanta(planta){
    const img = $('<img></img>');
    img.attr('src', planta.img);
    return img
}

//Elemento HTML nombre de planta
function crearNombrePlanta(planta) {
    const nombreProductoElement = $('<p></p>');
    nombreProductoElement.addClass('nombreProducto');
    nombreProductoElement.html(planta.nombre);
    return nombreProductoElement
}

//Elemento HTML categoría planta
function crearElementoCategoriaPlanta(planta) {
    const categoriaProductoElement = $('<p></p>');
    categoriaProductoElement.addClass('categoriaProducto');
    categoriaProductoElement.html(planta.tipo);
    return categoriaProductoElement
}

//Elemento HTML valor planta
function crearElementoValorPlanta(planta){
    const valorProductoElement = $('<p></p>');
    valorProductoElement.addClass('valorProducto');
    valorProductoElement.html(planta.precio);
    return valorProductoElement
}

//Seleccionar el formulario de agregar planta
const formulario = $("#formulario-agregar-planta");
function onSubmitCallback (e) {
    e.preventDefault();
    console.log("submit", e)
    let formulario = e.target;
    const nombre = formulario.children[0].value;
    const tipo = formulario.children[1].value;
    const altura = formulario.children[2].value;
    const precio = formulario.children[3].value;
    const planta = new Planta(nombre, altura, tipo, precio);
    const toast = $('#toast');
    toast.addClass('show');
    toast.html(planta.nombre + " agregada.")
    setTimeout(() => {
        toast.slideUp("slow")
        setTimeout(() => {
            toast.removeAttr('style')
            toast.removeClass("show")  
        }, 2000) 
    }, 3000);
    plantas_a_mostrar.push(planta);
    mostrarPlantas(plantas_a_mostrar);
    actualizarContadorPlantas(plantas_a_mostrar.length)
    localStorage.setItem('arreglo_de_plantas', JSON.stringify(plantas_a_mostrar))
}
//Evento de submit del formulario
formulario.on("submit", onSubmitCallback)

//Actualizar el contador de plantas con el valor del largo del arreglo
function actualizarContadorPlantas(numero_plantas){
    const element = $('#contador-plantas');
    element.html(`${numero_plantas} plantas agregadas`);
}
//Actualizar el listado de plantas en el DOM
function mostrarPlantas(plantas){
    const contenedor = $('#contenedor-plantas');
    contenedor.html('');
    for(const planta of plantas){
        //Div producto
        const elementoPlanta = crearElementoPlanta();
        elementoPlanta.css('display', 'none')
        //Imagen
        const imgPlanta = crearImagenPlanta(planta);
        //Nombre
        const nombrePlanta = crearNombrePlanta(planta);
        //Categoria
        const categoriaPlanta = crearElementoCategoriaPlanta(planta);
        //Valor
        const valorPlanta = crearElementoValorPlanta(planta);
        elementoPlanta.append(imgPlanta);
        elementoPlanta.append(nombrePlanta);
        elementoPlanta.append(categoriaPlanta);
        elementoPlanta.append(valorPlanta);
        contenedor.prepend(elementoPlanta);
        elementoPlanta.fadeIn();
        elementoPlanta.removeAttr('style')
    }
}