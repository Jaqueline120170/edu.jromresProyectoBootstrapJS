/**
 * 
 */
//*********************Esta pagina esta pensada para el area de administracion, la interaccion del usuario con la 
//pagina termina en la pagina de pago */
window.onload = function() {
	// Obtener los datos del almacenamiento local
	var pedidoId = parseInt(localStorage.getItem('pedidoId')) || 1;
	var usuario = localStorage.getItem('usuario');
	var ciudad = localStorage.getItem('ciudad');
	var carrito = JSON.parse(localStorage.getItem('carritoUsuario')) || [];
	var totalCompra = parseInt(localStorage.getItem('totalCompraUsuario')) || 0;
	var fecha = new Date().toLocaleDateString(); // Obtener la fecha actual

	var nuevoPedido = {
		id: pedidoId,
		usuario: usuario,
		ciudad: ciudad,
		fecha: fecha,
		carrito: carrito,
		total: totalCompra
	};

	// Obtener la lista de pedidos del almacenamiento local
	var listaPedidos = JSON.parse(localStorage.getItem('listaPedidos')) || [];

	// Verificar si el último pedido ya está en la lista
	var ultimoPedido = listaPedidos[listaPedidos.length - 1];
	if (!ultimoPedido || !esIgual(nuevoPedido, ultimoPedido)) {
		// Agregar el nuevo pedido a la lista de pedidos solo si no está ya presente
		listaPedidos.push(nuevoPedido);

		// Guardar la lista actualizada de pedidos en el almacenamiento local
		localStorage.setItem('listaPedidos', JSON.stringify(listaPedidos));
	}

	// Llamar a la función para mostrar los datos en la tabla
	mostrarDatosEnTabla(listaPedidos);
};

// Función para verificar si dos pedidos son iguales
function esIgual(pedido1, pedido2) {
	return JSON.stringify(pedido1) === JSON.stringify(pedido2);
}


//******************************************************FUNCION PARA MOSTRAR LOS DATOS DE LA TABLA PEDIDOS*********** */
function mostrarDatosEnTabla(listaPedidos) {
	var tablaBody = document.getElementById('pedidosBody');

	// Limpiar la tabla antes de agregar nuevas filas
	tablaBody.innerHTML = '';

	listaPedidos.forEach(item => {
		// Verificar si los datos están definidos antes de agregar la fila
		if (item.id && item.usuario && item.ciudad && item.fecha && item.total && item.carrito) {
			const fila = document.createElement('tr');

			var detallePedido = ''; // Almacena los detalles del pedido
			item.carrito.forEach(producto => {
				detallePedido += `${producto.cantidad} x ${producto.producto.nombre} - ${producto.producto.precio} €<br>`;
			});

			fila.innerHTML = `
                <td>${item.id}</td> 
                <td>${item.usuario}</td> 
                <td>${item.ciudad}</td> 
                <td>${item.fecha}</td> 
                <td>${detallePedido}</td> 
                <td>${item.total}€</td> 
                <td>
                    <button onclick="eliminarPedido(${item.id})">Eliminar</button>
                </td>
            `;
			tablaBody.appendChild(fila);
		}
	});
}
//***************************************************FUNCION PARA ELIMINAR UN PEDIDO***************************** */
function eliminarPedido(idPedido) {//elimina un pedido de la lista de pedidos que se muestran en la tabla
	// Obtener la lista de pedidos del almacenamiento local
	var listaPedidos = JSON.parse(localStorage.getItem('listaPedidos')) || [];

	// Filtrar la lista de pedidos para eliminar el pedido con el id proporcionado
	listaPedidos = listaPedidos.filter(pedido => pedido.id !== idPedido);

	// Actualizar la lista de pedidos en el almacenamiento local
	localStorage.setItem('listaPedidos', JSON.stringify(listaPedidos));

	// Llamar a la función para mostrar los datos en la tabla con la lista actualizada de pedidos
	mostrarDatosEnTabla(listaPedidos);

}
//******************************************FUNCIÓN PARA AÑADIR UN PEDIDO **************************************** */
function añadirPedido() {
	// Obtener los datos del nuevo pedido del usuario
	var nuevoPedido = {};
	nuevoPedido.id = parseInt(prompt("Por favor, ingresa el ID del pedido:"));
	nuevoPedido.usuario = prompt("Por favor, ingresa el nombre de usuario:");
	nuevoPedido.ciudad = prompt("Por favor, ingresa la ciudad:");

	// Obtener la fecha actual
	nuevoPedido.fecha = new Date().toLocaleDateString();

	// Solicita al administrador  los detalles del producto (precio, cantidad)
	var precioProducto = parseInt(prompt("Por favor, ingresa el precio del producto:"));
	var cantidadProducto = parseInt(prompt("Por favor, ingresa la cantidad del producto:"));

	// Crear el objeto producto con el precio y la cantidad proporcionados
	var producto = {
		nombre: "Producto",
		precio: precioProducto
	};

	// Agregar el objeto producto y la cantidad al carrito del nuevo pedido
	nuevoPedido.carrito = [{
		cantidad: cantidadProducto,
		producto: producto
	}];

	// Calcular el total del pedido
	nuevoPedido.total = cantidadProducto * precioProducto;

	// Obtener la lista de pedidos del almacenamiento local
	var listaPedidos = JSON.parse(localStorage.getItem('listaPedidos')) || [];

	// Agregar el nuevo pedido a la lista de pedidos
	listaPedidos.push(nuevoPedido);

	// Guardar la lista actualizada de pedidos en el almacenamiento local
	localStorage.setItem('listaPedidos', JSON.stringify(listaPedidos));

	// Llamar a la función para mostrar los datos en la tabla con el nuevo pedido agregado
	mostrarDatosEnTabla(listaPedidos);
}

