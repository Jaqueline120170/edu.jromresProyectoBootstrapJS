
/**
 * 
 */
//Esta funcion es para que se ejecute cuandon lapágina se carga por completo
window.onload = function() {
	// con esta variable global se inicializa un array para guardar los elementos que conformaran un  carrito
	var carrito = [];
	try {
		// con este trycatch intento recuperar los elementos del carrito desde el almacenamiento local
		carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	} catch (err) {
		// Si hay un error lo imprimirá por consola , recurrí este trychatch porque almprobarlo en otro navegador no cargaba los productos,
		//esto hace que funcione correctamente
		console.log(err)
	}
	// Llamado a la función para cargar los productos en el carrito
	cargarProductosEnCarrito(carrito);
	// invova a la función para cargar los productos en el carrito
	mostrarCarrito();
};

//****************************************FUNCION PARA CARGAR LOS PRPDUCTOS SELECCIONADOS EN EL CARRITO */
function cargarProductosEnCarrito(carrito) {
	// Obtiene el cuerpo de la tabla del carrito
	const carritoBody = document.getElementById('carrito-body');
	// Inicializa el total de la compra sumando 5 porque como se especifica debajo de la tabla carrito de compras
	// el envio tiene un costo por defecto de 5 euros
	let totalCompra = (parseInt(localStorage.getItem('totalCompra')) || 0) + 5;
	//recorre el carrito
	carrito.forEach(item => {
		const fila = document.createElement('tr');
		fila.innerHTML = `
                	<td>${item.producto.nombre}</td>
                	<td>${item.producto.precio}€</td>
                	<td>${item.cantidad}</td>
                	<td><button style="border-radius:12px; width:30px; height:30px; margin: 0 5px" onclick="restarCantidad('${item.producto.nombre}')">-</button>${item.cantidad}<button style="border-radius:12px; width:30px; height:30px; margin: 0 5px" onclick="sumarCantidad('${item.producto.nombre}')">+</button></td>
                	<td><button style="border-radius:8px;height:35px;" onclick="eliminarProducto('${item.producto.nombre}')">Eliminar</button></td>
            	`;
		//agrega la fila al tbody
		carritoBody.appendChild(fila);

	});
	//actualiza el htmlencargado de mostrar el total dela cmpra
	document.getElementById('total').innerText = `${totalCompra} €`;

}

//***********************************FUNCION PARA ELIMINAR EL PRODUCTO DEL CARRITO DE COMPRAS */
function eliminarProducto(nombreProducto) {
	let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	let item = carrito.find(item => item.producto.nombre === nombreProducto)

	carrito = carrito.filter(item => item.producto.nombre !== nombreProducto);
	localStorage.setItem('carrito', JSON.stringify(carrito));


	let total = parseInt(localStorage.getItem('totalCompra')) || 0;
	total = total - (item.producto.precio * item.cantidad);
	localStorage.setItem('totalCompra', total);

	location.reload();// Recargar la página para reflejar los cambios en el carrito
}


//***************************************FUNCION PARA MOSTRAR CARRITO ********************* */
function mostrarCarrito() {
	const carrito = document.getElementById('carrito');

	carrito.style.display = 'block';
}

//*************************************FUNCION PARA ACCEDER A LA PGINA DE FORMULARIO DE ENVIO Y CONTINUAR CON EL PAGO ****************/
function accederEnvio() {
	let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	// Verificar si el carrito está vacío
	if (carrito.length === 0) {
		// Mostrar mensaje de alerta si el carrito esta vacio no te deja acceder a la pagona de form envio 
		alert('¡Tu carrito está vacío! ¿Por qué no añades algunos productos?');
	}
	else {
		//sino esta vacío te deja acceder a la pagina de formulario de envio
		window.location.href = "formularioEnvio.html";
	}
}
//*************************************************FUNCION PARA RESTAR CANTIDAD DE PRODUCTO */
function restarCantidad(nombreProducto) {
	let carrito = JSON.parse(localStorage.getItem('carrito'));
	producto = carrito.find(item => item.producto.nombre === nombreProducto);
	if (producto.cantidad == 1) {
		eliminarProducto(nombreProducto);;
	} else {
		producto.cantidad -= 1;

		let totalCompra = parseInt(localStorage.getItem('totalCompra'));
		totalCompra = totalCompra - producto.producto.precio;
		localStorage.setItem('totalCompra', totalCompra);


		localStorage.setItem('carrito', JSON.stringify(carrito));
		location.reload();// Recargar la página para reflejar los cambios en el carrito
	}


}
//****************************************FUNCION PARA SUMAR CANTIDADES AL CARRITO */
function sumarCantidad(nombreProducto) {
	let carrito = JSON.parse(localStorage.getItem('carrito'));
	producto = carrito.find(item => item.producto.nombre === nombreProducto);

	producto.cantidad += 1;

	let totalCompra = parseInt(localStorage.getItem('totalCompra'));
	totalCompra = totalCompra + producto.producto.precio;
	localStorage.setItem('totalCompra', totalCompra);

	localStorage.setItem('carrito', JSON.stringify(carrito));
	location.reload();// Recargar la página para reflejar los cambios en el carrito
}