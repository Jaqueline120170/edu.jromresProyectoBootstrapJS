/**
 * 
 */
//**************************************FUNCONES PARA VALIDAR LOS CAMPOS DEL FORMULARIO DE PAGO************ */

var boton = document.getElementById('botonPago');

function validarNombreTarjeta(nombre) {
	let nombreTarjeta = document.getElementById('nombreTarjeta');
	if (!nombre.match('^[a-zA-Z]*$')) {
		alert('El nombre no es válido');
		nombreTarjeta.value = ''; // Borrar el contenido incorrecto
		nombreTarjeta.focus(); // Enfocar el cursor en el campo
		return false;
	}
	return true;
}

function validarNumeroTarjeta(numero) {
	let numeroTarjeta = document.getElementById('numeroTarjeta');
	if (!numero.match('^[0-9]{16}$')) {
		alert('El número ingresado no es válido, verifique que sean 16 dígitos');
		numeroTarjeta.value = ''; // Borrar el contenido incorrecto
		numeroTarjeta.focus(); // Enfocar el cursor en el campo
		return false;
	}
	return true;
}

function validarVencimientoTarjeta(vencimiento) {
	let vencimientoTarjeta = document.getElementById('vencimientoTarjeta');
	if (!vencimiento.match('^(0[1-9]|1[0-2])\/?([0-9]{2})$')) {
		alert('Verifique que la fecha ingresada sea correcta');
		vencimientoTarjeta.value = ''; // Borrar el contenido incorrecto
		vencimientoTarjeta.focus(); // Enfocar el cursor en el campo
		return false;
	} else {
		// Valida la fecha 
		const fechaValidar = vencimiento.split('/');
		const mes = parseInt(fechaValidar[0]) - 1;
		const año = parseInt('20' + fechaValidar[1]);
		const fechaTarjeta = new Date(año, mes, 1); // Crear fecha con día 1 para simplificar
		const fechaActual = new Date();

		if (fechaTarjeta < fechaActual) {
			alert('Tarjeta con fecha de vencimiento no válida');
			vencimientoTarjeta.value = ''; //esto borra el contenido incorrecto
			vencimientoTarjeta.focus(); // me devuelve al contenedor para llnearlo de nuevo
			return false;
		}
	}
	return true;
}

function validarCodigoTarjeta(codigo) {
	let codigoTarjeta = document.getElementById('codigoTarjeta');
	if (!codigo.match('^[0-9]{3}$')) {
		alert('El código ingresado no es válido, verifique que sean 3 dígitos');
		codigoTarjeta.value = ''; // Borrar el contenido incorrecto
		codigoTarjeta.focus(); // Enfocar el cursor en el campo
		return false;
	}
	return true;
}
//**************************************FUNCION PARA VALIDAR EL PAGO**************************** */
function validarPago() {
	let nombre = document.getElementById('nombreTarjeta').value;
	let numero = document.getElementById('numeroTarjeta').value;
	let vencimiento = document.getElementById('vencimientoTarjeta').value;
	let codigo = document.getElementById('codigoTarjeta').value;
	if (validarNombreTarjeta(nombre) &&
		validarNumeroTarjeta(numero) &&
		validarVencimientoTarjeta(vencimiento) &&
		validarCodigoTarjeta(codigo)) {
		alert('¡Su pago ha sido procesado con éxito!\nGRACIAS POR SU COMPRA');
		limpiarCarrito();
	} else {
		alert('Verifique que los datos ingresados sean correctos e inténtelo de nuevo');
	}
}

boton.addEventListener('click', validarPago);


//*********************************************************FUNCION LIMPIAR CARRITO***************************************** */
function limpiarCarrito() {
	localStorage.setItem('carrito', []);
	localStorage.setItem('totalCompra', 0);
	//Con esta funcion se supone que termina la interaccion con el usuario.De forma provisional en esta pagina 
	//he añadido un enlace a "pedidos administracion" con la intención de que entren los empleados y ellos gestionen y 
	// manipulen los pedidos. Es por eso que hay un botton de añadir donde puede introducir los datos manualmente. 
}