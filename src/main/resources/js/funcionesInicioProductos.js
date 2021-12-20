function traerInfoClothe() {
    $.ajax({
        // url: "http://localhost:8080/api/clothe/all",
        url: "http://129.151.113.224:8080/api/clothe/all",
        type: "GET",
        datatype: "JSON",
        success: function (productos) {
            console.log(productos);
            pintarRespClothe(productos);
        },
        error: function (jdXHR, textStatus, errorThrown) {
        }
    });
}
function pintarRespClothe(productos) {
    let fila = '';
    for (i = 0; i < productos.length; i++) {
        
        fila += "<tr>"
        fila += "<td>" + productos[i].reference + "</td>";
        fila += "<td>" + productos[i].category + "</td>";
        fila += "<td>" + productos[i].size + "</td>";
        fila += "<td>" + productos[i].description + "</td>";
        fila += "<td>" + productos[i].availability + "</td>";
        fila += "<td>" + productos[i].price + "</td>";
        fila += "<td>" + productos[i].quantity + "</td>";
        fila += "<td>" + productos[i].photography + "</td>";
        let cadReferencia = productos[i].reference;
        let refNum = (productos[i].reference).substring(3,cadReferencia.length);
        fila += "<td> <a href='#ventana1' class='btn btn-success' data-toggle='modal' onClick='obtItemEspClothe(" + refNum + ")'>Editar</a>";
        fila += '<td> <button type="button" class="btn btn-danger" onClick="borrarElementoClothe(' + refNum + ')">Borrar</button>';
        fila += "</tr>";
        console.log(productos[i].reference);
        
    }
    // myTable+="</table>";
    $('#cuerpoProductos').html(fila);
}

function obtItemEspClothe(numRef) {
    let iniciales = "AP-";
    let referenciaCom = iniciales + numRef;
    console.log(referenciaCom);

    $.ajax({
        // url: "http://localhost:8080/api/clothe/" + referenciaCom,
        url: "http://129.151.113.224:8080/api/clothe/" + referenciaCom,
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

function borrarElementoClothe(numRef) {
    let iniciales = "AP-";
    let referenciaCom = iniciales + numRef;

    console.log("Entro");
    $.ajax({
        // url: "http://localhost:8080/api/clothe/" + referenciaCom,
        url: "http://129.151.113.224:8080/api/clothe/" + referenciaCom,
        type: "DELETE",
        datatype: "JSON",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        success: function () {
            alert("Se ha eliminado exitosamente");
            traerInfoClothe();
        },
        error: function (jdXHR, textStatus, errorThrown) {
            alert("No se ha eliminado exitosamente");
        }
    });
}




function editarInfoClothe(){
    let myData ={
        reference: $("#clotheReferenceEditar").val(),
        category: $("#clotheCategoryEditar").val(),
        size: $("#clotheSizeEditar").val(),
        description: $("#clotheDescriptionEditar").val(),
        availability: $("#clotheAvailaEditar").val(),
        price: $("#clothePriceEditar").val(),
        quantity: $("#clotheQuantityEditar").val(),
        photography: $("#clothePhotoEditar").val()
    };
    $.ajax({
        // url: "http://localhost:8080/api/clothe/update",
        url: "http://129.151.113.224:8080/api/clothe/update",
        type: "PUT",
        data: myData,
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(myData),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        success: function (respuesta) {
            $("#clotheReferenceEditar").val("");
            $("#clotheCategoryEditar").val("");
            $("#clotheSizeEditar").val("");
            $("#clotheDescriptionEditar").val("");
            $("#clotheAvailaEditar").val("");
            $("#clothePriceEditar").val("");
            $("#clotheQuantityEditar").val("");
            $("#clothePhotoEditar").val("");
            alert("Se ha actualizado exitosamente");
            traerInfoClothe();
        },
        error: function (jdXHR, textStatus, errorThrown) {
            alert("No se ha actualizado exitosamente");
        }
    });
}