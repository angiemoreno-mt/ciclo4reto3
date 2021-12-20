// function traerInfoClothe() {
//     $.ajax({
//         // url: "http://localhost:8080/api/clothe/all",
//         url: "http://129.151.113.224:8080/api/clothe/all",
//         type: "GET",
//         datatype: "JSON",
//         success: function (productos) {
//             console.log(productos);
//             pintarRespClothe(productos);
//         },
//         error: function (jdXHR, textStatus, errorThrown) {
//         }
//     });
// }
// function pintarRespClothe(productos) {
//     let fila = '';
//     for (i = 0; i < productos.length; i++) {

//         fila += "<tr>"
//         fila += "<td>" + productos[i].reference + "</td>";
//         fila += "<td>" + productos[i].category + "</td>";
//         fila += "<td>" + productos[i].size + "</td>";
//         fila += "<td>" + productos[i].description + "</td>";
//         fila += "<td>" + productos[i].availability + "</td>";
//         fila += "<td>" + productos[i].price + "</td>";
//         fila += "<td>" + productos[i].quantity + "</td>";
//         fila += "<td>" + productos[i].photography + "</td>";
//         fila += "</tr>";
//     }
//     // myTable+="</table>";
//     $('#cuerpoProductos').html(fila);
// }



function traerOrdenes() {
    console.log("test funcion ordenes")
    $.ajax({
        url: "http://129.151.113.224:8080/api/order/all",
        type: "GET",
        datatype: "JSON",
        success: function (items) {

            pintarRespOrder(items);
        },
        error: function (jdXHR, textStatus, errorThrown) {
        }
    });

}

function pintarRespOrder(items) {
    let fila = '';
    ordenes = items;
    for (i = 0; i < ordenes.length; i++) {

        fila += "<tr>"
        fila += "<td>" + ordenes[i].salesMan.identification + "</td>";
        fila += "<td>" + ordenes[i].salesMan.name + "</td>";
        fila += "<td>" + ordenes[i].salesMan.email + "</td>";
        fila += "<td>" + ordenes[i].registerDay + "</td>";
        fila += "<td>" + ordenes[i].id + "</td>";
        fila += "<td>" + ordenes[i].status + "</td>";
        fila += '<td><button type="button" class="btn btn-warning" onClick="mostrarOrden(' + ordenes[i].id + ')">Ver Pedido</button>';
        fila += "</tr>";
    }
    // myTable+="</table>";
    $('#cuerpoOrdenes').html(fila);

}

function obtItemEspOrder(id) {
    id = id;
    $.ajax({
        // url: "http://localhost:8080/api/clothe/" + referenciaCom,
        url: "http://129.151.113.224:8080/api/order/" + id,
        type: "GET",
        datatype: "JSON",
        success: function (producto) {
            console.log(producto);
            $("#clotheReferenceEditar").val(producto.reference);
            $("#clotheReferenceEditar").attr("readonly", true);
            $("#clotheCategoryEditar").val(producto.category);
            $("#clotheSizeEditar").val(producto.size);
            $("#clotheDescriptionEditar").val(producto.description);
            $("#clotheAvailaEditar").val(producto.availability);
            $("#clothePriceEditar").val(producto.price);
            $("#clotheQuantityEditar").val(producto.quantity);
            $("#clothePhotoEditar").val(producto.photography);
        },
        error: function (jdXHR, textStatus, errorThrown) {

        }
    });
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

function traerOrden(idOrder) {
    console.log("Estoy trayendo una orden " + idOrder)
    $.ajax({
        url: "http://129.151.113.224:8080/api/order/" + idOrder,
        type: "GET",
        datatype: "JSON",
        success: function (items) {
            pintarRespOrderEsp(items);
            pintarRespOrderDet(items);
        },
        error: function (jdXHR, textStatus, errorThrown) {
        }
    });
}

function pintarRespOrderEsp(items) {
    console.log(items);
    let fila = '';
    orden = items;
    fila += "<tr>"
    fila += "<td>" + orden.registerDay + "</td>";
    fila += "<td>" + orden.id + "</td>";
    fila += "<td>" + orden.status + "</td>";
    let ordenEspecifica = JSON.stringify(orden);

    sessionStorage.setItem("orden", ordenEspecifica);
    fila += '<td><select name="statusOrder" id="statusOrder"class="form-control" required><option selected value="">Selecciona estado:</option><option value="Pendiente">Pendiente</option><option value="Aprobada">Aprovada</option>><option value="Rechazada">Rechazada</option></select ></td>';
    fila += '<td><button type="button" class="btn btn-success" onClick="editarEstadoOrden()">Guardar</button>';
    fila += "</tr>";

    // myTable+="</table>";
    $('#cuerpoOrdenEsp').html(fila);

}

function pintarRespOrderDet(items) {
    let fila = '';
    productos = []
    productos.push(items.products);
    productosOrden = Object.values(productos[0]);
    console.log(productosOrden[1]);
    cantidad = Object.values(items.quantities);
    console.log(cantidad);
    // fila += "<td>" + productosOrden[0].photography + "</td>";
    for (i = 0; i < productosOrden.length; i++) {

        fila += "<tr>"
        fila += "<td>" + productosOrden[i].photography + "</td>";
        fila += "<td>" + productosOrden[i].reference + "</td>";
        fila += "<td>" + productosOrden[i].category + "</td>";
        fila += "<td>" + productosOrden[i].description + "</td>";
        fila += "<td>" + productosOrden[i].price + "</td>";
        fila += "<td>" + cantidad[i] + "</td>";
        fila += "<td>" + productosOrden[i].quantity + "</td>";
        fila += "</tr>";
    }
    // fila += "<tr>"
    // fila += "<td>" + orden.registerDay + "</td>";
    // fila += "<td>" + orden.id + "</td>";
    // fila += "<td>" + orden.status + "</td>";
    // fila += '<td><select name="statusOrder" id="statusOrder"class="form-control" required><option selected value="">Selecciona estado:</option><option value="Pendiente">Pendiente</option><option value="Aprobada">Aprovada</option>><option value="Rechazada">Rechazada</option></select ></td>';
    // fila += '<td><button type="button" class="btn btn-success" ">Guardar</button>';
    // fila += "</tr>";

    $('#cuerpoOrdenDet').html(fila);

}

function editarEstadoOrden(){
    let valor = $("#statusOrder").val();
    console.log(valor);
    let orden = sessionStorage.getItem("orden");
    let ordenJS = JSON.parse(orden);
    let myData ={
        id: ordenJS.id,
        registerDay: ordenJS.registerDay,
        status: $("#statusOrder").val(),
        salesMan: ordenJS.salesMan,
        products: ordenJS.products,
        quantities: ordenJS.quantities
    };
    $.ajax({
        // url: "http://localhost:8080/api/clothe/update",
        url: "http://129.151.113.224:8080/api/order/update",
        type: "PUT",
        data: myData,
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(myData),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        success: function (respuesta) {
            $("#statusOrder").val("");
            alert("Se ha actualizado exitosamente");
            traerOrden(ordenJS.id);
        },
        error: function (jdXHR, textStatus, errorThrown) {
            alert("No se ha actualizado exitosamente");
        }
    });
}

function mostrarOrden(idOrden) {
    document.getElementById('contenidoOrden').style.display = 'block';
    document.getElementById('contenidoOrdenes').style.display = 'none';
    traerOrden(idOrden);
}

function mostrarOrdenes() {
    document.getElementById('contenidoOrdenes').style.display = 'block';
    document.getElementById('contenidoOrden').style.display = 'none';
    sessionStorage.removeItem("orden");
}

$(document).ready(function () {
    traerUser();
    // traerInfoClothe();
    traerOrdenes();
    document.getElementById('contenidoOrden').style.display = 'none';
});