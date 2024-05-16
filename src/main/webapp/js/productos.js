/**
 * 
 */
//Array que  contiene los detalles de cada producto 
const articulosProductos = [
	{ nombre: "Modelos Quirúrgicos", precio: 50, imagen: "imagenes/imagen1.jpg" },
	{ nombre: "Instrumental Quirurgico", precio: 60, imagen: "imagenes/imagen2.jpg" },
	{ nombre: "Modelos Osteologia", precio: 90, imagen: "imagenes/imagen4.jpg" },
	{ nombre: "Modelos Anatomicos", precio: 25, imagen: "imagenes/anatomiaHumana.jpg" },
	{ nombre: "Protesis", precio: 80, imagen: "imagenes/protesis.jpg" },
	{ nombre: "Kit anatomía comparada", precio: 70, imagen: "imagenes/anatomiaAnimal.jpg" },
	{ nombre: "Anatomia Osea", precio: 30, imagen: "imagenes/anatomiaComparada.jpg" },
	{ nombre: "Primates", precio: 20, imagen: "imagenes/primates.jog.jpg" },
	{ nombre: "PrintJDK-23", precio: 500, imagen: "imagenes/impresoraAnatomia.jpg" },
	{ nombre: "Printer SDF-24", precio: 60, imagen: "imagenes/imoresora.jpg" },
	{ nombre: "Printer PLA-24", precio: 90, imagen: "imagenes/impresora3.jpg" },
	{ nombre: "Printer DDL-24", precio: 25, imagen: "imagenes/impresora4.jpg" },
	{ nombre: "Curso Diseño", precio: 40, imagen: "imagenes/curso3.jpg" },
	{ nombre: "Curso Modelado", precio: 85, imagen: "imagenes/curso4.jpg" },
	{ nombre: "Curso Introduccion 3D", precio: 45, imagen: "imagenes/curso1.jpg" },
	{ nombre: "Curso materiales 3D", precio: 25, imagen: "imagenes/curso2.jpg" }
];

//variables para mantener el total de la compra y el contenido del ccarrito
let totalCompra = 0;
let carrito = [];

try {
	// Este control de excepciones intenta recuperar el total de la compra y el contenido del carrito del almacenamiento local
	totalCompra = parseInt(localStorage.getItem('totalCompra')) || 0;
	carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} catch (err) {
	// Si hay un error al analizar los datos que queremos almacenar en el almacenamiento local, se imprime un error por consola
	//emplee esta solución porque al momento de hacer las pruebas en distintos navegadores en uno daba un fallo
	console.info(err);
}

//***************************************FUNCIONES PARA CARGAR LOS PRODUCTOS EN EL MAIN */
function cargarProductos() {
	// la declaracion de esta variable tiene como finalidad obtener el contenedor donde se cargarán los productos
	const contenedorProductos = document.getElementById('productos1');
	// Esto limpia el contenedor
	contenedorProductos.innerHTML = '';
	// Este buble recorre los atributis de cada producto y crea una tarjeta para mostrarlo
	articulosProductos.forEach((producto, index) => {
		const productoCard = document.createElement('div');
		productoCard.className = 'producto-card';
		productoCard.innerHTML = `
										<img class="card-img-top" src="${producto.imagen}" alt="anatomiaAnimal"
											width="100" height="150">
										<div class="card-body productos">
											<h5 class="card-title">${producto.nombre}</h5>
											<p class="card-text">Incluye materiales</p>
											<p class="card-text">Precio: ${producto.precio}€</p>
											<button class="btn btn-primary botonComprar" onclick="agregarAlCarrito(${index})">Comprar</button>
										</div>
								
                `;
		contenedorProductos.appendChild(productoCard);

		// con localstorage se guarda el contenido del carrito en el almacenamiento local después de cargar cada producto
		localStorage.setItem('carrito', JSON.stringify(carrito));
	});
}
//*************************************FUNCION PARA AÑADIR EL PRODICTO SELECCIONADO AL CARRITO */
function agregarAlCarrito(index) {
	// Se declara esta variable para btener el producto que hemos seleccionado
	const productoSeleccionado = articulosProductos[index];
	// trae  el contenido actual del carrito desde el almacenamiento local, es decir, tal cual está 
	carrito = JSON.parse(localStorage.getItem('carrito')) || []

	//Declaracion de variable para verificar si el producto ya está en el carrito con find
	let productoExistente = carrito.find(item => item.producto.nombre === productoSeleccionado.nombre);
	if (productoExistente) {
		// Este condicional se emplea para verificar si el producto ya está en el carrito
		productoExistente.cantidad++;
	} else {
		// Si el producto no está en el carrito, agregarlo con una cantidad de 1
		carrito.push({ producto: productoSeleccionado, cantidad: 1 });
	}
	// Nuevamente con esto se guardará el contenido actualizado del carrito en el almacenamiento local
	localStorage.setItem('carrito', JSON.stringify(carrito));
	// y se actualiza el total de la compra
	totalCompra += productoSeleccionado.precio;
	localStorage.setItem('totalCompra', totalCompra);

}

// window onload se usa para cargar productos al cargar la página cada que entre 
window.onload = cargarProductos;