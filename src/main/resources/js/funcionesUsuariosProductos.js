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
        fila += "</tr>";
    }
    // myTable+="</table>";
    $('#cuerpoProductos').html(fila);
}

function traerUser() {
    let user = sessionStorage.getItem("user");
    let userJS = JSON.parse(user);
    let typeUser;
    console.log(user);
    if(userJS.type=="ASE"){
        typeUser = "Asesor Comercial";
    }else{
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

$(document).ready(function () {
    traerUser();
});