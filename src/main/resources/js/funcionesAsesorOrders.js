let productos = [];
let productosSeleccionados = [];
let cantidades = [];
let codigosPedidos = [];
// sessionStorage.setItem(codigosPedidos);

function traerInfoClothe() {
    $.ajax({
        url: "http://129.151.113.224:8080/api/clothe/all",
        type: "GET",
        datatype: "JSON",
        success: function (items) {
            console.log(items);
            pintarRespClothe(items);
        },
        error: function (jdXHR, textStatus, errorThrown) {
        }
    });
}
function pintarRespClothe(items) {
    let fila = '';
    productos = items;
    for (i = 0; i < items.length; i++) {

        fila += "<tr>"
        fila += "<td>" + items[i].reference + "</td>";
        fila += "<td>" + items[i].category + "</td>";
        fila += "<td>" + items[i].size + "</td>";
        fila += "<td>" + items[i].description + "</td>";
        fila += "<td>" + items[i].price + "</td>";
        let identCaja = "prod_" + items[i].reference;
        let identBoton = "bot_" + items[i].reference;
        console.log(identCaja);
        fila += '<td><input type="number" id="'+identCaja+'"></td>';
        fila += '<td><button type="button" class="btn btn-success" id="' + identBoton + '" onClick="registrarProducto(' + i + ')">Agregar</button>';
        fila += '<td><button type="button" class="btn btn-danger" id="' + identBoton + '" onClick="eliminarProducto(' + i + ')">Eliminar</button>';
        fila += "</tr>";
    }
    // myTable+="</table>";
    $('#cuerpoProductos').html(fila);
}

function eliminarProducto(indice){
    let encontro = false;
    let referencia = productos[indice].reference;
    console.log(referencia);
    for (index = 0; index < productosSeleccionados.length; index++) {
        if (productosSeleccionados[index].reference == referencia) {
            encontro = true;
            break;
        }
    }
    if (encontro){
        for(var i in productosSeleccionados){
            if(productosSeleccionados[i]==referencia){
                productosSeleccionados.splice(i, 1);
                console.log(productosSeleccionados);
                pintarElemPedido();
                break;
            }
        }
    }
    
    
}

function registrarProducto(indice) {
    let referencia = productos[indice].reference;
    let idCaja = "prod_" + referencia;
    let index = 0;
    let encontro = false;
    cantidadProducto = parseInt(document.getElementById(idCaja).value);
    console.log(cantidadProducto);
    if (isNaN(cantidadProducto) || cantidadProducto < 0) {
        alert("Ingrese una cantidad mayor a cero");
        document.getElementById(idCaja).focus;
        return;
    } else {
        $("#procesarOrden").show();
        cantidadProducto = parseInt(document.getElementById(idCaja).value);
    }

    for (index = 0; index < productosSeleccionados.length; index++) {
        if (productosSeleccionados[index].reference == referencia) {
            encontro = true;
            break;
        }
    }

    if (encontro) {
        cantidades[index] = cantidades[index] + cantidadProducto;
    } else {
        cantidades.push(cantidadProducto);
        productosSeleccionados.push(productos[indice]);
    }

    document.getElementById(idCaja).value = "";
    document.getElementById(idCaja).focus();

    pintarElemPedido();
}

function pintarElemPedido() {
    let tabla = document.querySelector("#pedido");
    let subtotal = 0;
    tabla.innerHTML = "";

    let tr = document.createElement("tr")
    let tdReference = document.createElement("th")
    let tdPrice = document.createElement("th")
    let tdCantidad = document.createElement("th")
    let tdsubTotal = document.createElement("th")

    tdReference.innerHTML = "REFERENCIA";
    tdPrice.innerHTML = "PRECIO";
    tdCantidad.innerHTML = "CANTIDAD";
    tdsubTotal.innerHTML = "SUBTOTAL";

    tr.appendChild(tdReference);
    tr.appendChild(tdPrice);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdsubTotal);
    tabla.appendChild(tr);
    for (let indice = 0; indice < productosSeleccionados.length; indice++) {

        tr = document.createElement("tr")
        tdReference = document.createElement("td")
        tdPrice = document.createElement("td")
        tdCantidad = document.createElement("td")
        tdsubTotal = document.createElement("td")
        precio = parseInt(productosSeleccionados[indice].price);
        cantidad = parseInt(cantidades[indice]);

        tdReference.innerHTML = productosSeleccionados[indice].reference;
        tdPrice.innerHTML = productosSeleccionados[indice].price;
        tdCantidad.innerHTML = cantidades[indice]
        tdsubTotal.innerHTML = (precio * cantidad);

        tr.appendChild(tdReference);
        tr.appendChild(tdPrice);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdsubTotal);
        tabla.appendChild(tr);

        subtotal = subtotal + precio * cantidad;
    }
    tr = document.createElement("tr");
    tdsubTotal = document.createElement("td")
    tdTitulo = document.createElement("th")
    tdsubTotal.innerHTML = subtotal;
    tdTitulo.innerHTML = "TOTAL";
    tr.appendChild(tdTitulo).colSpan = "3";
    tr.appendChild(tdsubTotal);
    tabla.appendChild(tr);

    $("#pedido").show();
    $("#procesarOrden").show();
}

function procesarOrden(){
    let user = sessionStorage.getItem("user");
    let userJs = JSON.parse(user);
    let productos = {};
    let quantities ={};

    for (let i = 0; i < productosSeleccionados.length; i++) {
        productos[productosSeleccionados[i].reference]=productosSeleccionados[i]; 
        quantities[productosSeleccionados[i].reference]=cantidades[i];  
    }

    let order = {
        registerDay: "2021-09-15T05:00:00.000+00:00",
        status: "Pendiente",
        salesMan: userJs,
        products: productos,
        quantities:quantities 
    }

    // let orderJson = JSON.stringify(order);

    $.ajax({
        url: "http://129.151.113.224:8080/api/order/new",
        data : JSON.stringify(order),
        type: 'POST',
        contentType:"application/JSON",
        success: function (respuesta) {
            console.log("Exitoso");
            alert("Orden de pedido procesada correctamente. El código de tu pedido es " + codigoPedido());
            productosSeleccionados=[];
            cantidades=[];
            recargarPag();
            traerInfoClothe();

            // Swal.fire('Orden de pedido ' +respuesta.id + ' procesada correctamente...');
        },

        error: function (xhr, status) {
            console.log("Algo salio mal");
        }
    });
}

function codigoPedido(){
    let today = new Date();

    const fecha = today.toISOString();

    // let id = []
    // $.ajax({
    //     // url: "http://localhost:8080/api/clothe/all",
    //     url: "http://129.151.113.224:8080/api/order/all",
    //     type: "GET",
    //     datatype: "JSON",
    //     success: function (items) {
    //         for (var i = 0; i < items.length; i++){
    //             valorId = items[i].id;
    //             id.push(valorId);
    //         }
    //     },
    //     error: function (jdXHR, textStatus, errorThrown) {
    //     }
    // });
    // let ultimoId = id[-1];
    // let numPedidos = ultimoId + 1; 
    // let codigoPedido = estructuraFecha+toString(numPedidos);
    codigosPedidos.push(fecha);
    return fecha;
}


function traerOrdenes() {
    console.log("test funcion ordenes")
    $.ajax({
        url: "http://129.151.113.224:8080/api/order/all",
        type: "GET",
        datatype: "JSON",
        success: function (ordenes) {

            pintarRespOrder(ordenes);
        },
        error: function (jdXHR, textStatus, errorThrown) {
        }
    });

}

function pintarRespOrder(ordenes) {
    let fila = '';
    for (i = 0; i < ordenes.length; i++) {

        fila += "<tr>"
        fila += "<td>" + ordenes[i].id + "</td>";
        fila += "<td>" + ordenes[i].registerDay + "</td>";
        fila += "<td>" + ordenes[i].status + "</td>";
        fila += "</tr>";
    }
    $('#cuerpoOrdenes').html(fila);

}


function traerUser() {
    let user = sessionStorage.getItem("user");
    let userJS = JSON.parse(user);
    let typeUser;
    console.log(user);
    if (userJS.type == "ASE") {
        typeUser = "Asesor Comercial";
    } else {
        typeUser = "Administrador";
    }
    var fila = '';

    fila += "<tr>"
    fila += "<td>" + userJS.identification + "</td>";
    fila += "<td>" + userJS.name + "</td>";
    fila += "<td>" + userJS.email + "</td>";
    fila += "<td>" + typeUser + "</td>";
    fila += "<td>" + userJS.zone + "</td>";
    fila += "</tr>";
    $('#cuerpoUsuarioLog').html(fila);

}

function recargarPag(){
    $("#procesarOrden").hide();
    $("#pedido").hide();
    $("#pedido").html("");
}

$(document).ready(function () {
    traerUser();
    traerInfoClothe();
    // traerOrdenes();

    $("#procesarOrden").click(function (){
        procesarOrden();
    });
});