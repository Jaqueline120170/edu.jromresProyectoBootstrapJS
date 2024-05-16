//**********************************FUNCION QUE GUARDA LOS DATOS DEL FORMULARIO PARA CONFORMAR UN PEDIDO************** */
function guardarDatos(event) {
	// Obtiene los valores del formulario
	var pedidoId = parseInt(localStorage.getItem('pedidoId')) || 1; // Empieza en 1 si no existe
	var nombre = document.getElementById('nombre').value;
	var apellidos = document.getElementById('apellidos').value;
	var ciudad = document.getElementById('ciudad').value;

	// Obtener los detalles del carrito del almacenamiento local
	var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	var totalCompra = parseInt(localStorage.getItem('totalCompra')) || 0;

	// Guarda los datos en el almacenamiento local del navegador
	localStorage.setItem('usuario', nombre + ' ' + apellidos);
	localStorage.setItem('ciudad', ciudad);
	localStorage.setItem('carritoUsuario', JSON.stringify(carrito));
	localStorage.setItem('totalCompraUsuario', totalCompra);
	localStorage.setItem('pedidoId', pedidoId + 1);

	alert('Los datos del envío se han guardado correctamente.No olvides pulsar el boton "Continuar" finalizar tu compra :)');

	// Llama a la función para guardar el pedido
	guardarPedido();

	// Es un metodo del formulario para limpiarlo entero una vez que se envia
	event.target.reset();
}


//*************************************FUNCION PARA GUARDAR EL PEDIDO********************************************** */
function guardarPedido() {
	// Obtener los datos necesarios del formulario
	let nombre = document.getElementById('nombre').value;
	let apellidos = document.getElementById('apellidos').value;
	let ciudad = document.getElementById('ciudad').value;
	let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	let totalCompra = parseInt(localStorage.getItem('totalCompra')) || 0;

	// Generar un objeto que represente el pedido
	let pedido = {
		nombre: nombre,
		apellidos: apellidos,
		ciudad: ciudad,
		carrito: carrito,
		totalCompra: totalCompra
	};

	// Obtener los pedidos anteriores del localStorage
	let pedidos = JSON.parse(localStorage.getItem('listaPedidos')) || [];

	// Agregar el nuevo pedido a la lista de pedidos
	pedidos.push(pedido);

	// Esto la lista de pedidos actualizada en el localStorage
	localStorage.setItem('listaPedidos', JSON.stringify(pedidos));
}

