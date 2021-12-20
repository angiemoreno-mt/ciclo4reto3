function traerInfoUser() {
    $.ajax({
        // url: "http://localhost:8080/api/user/all",
        url: "http://129.151.113.224:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (usuarios) {
            console.log(usuarios);
            pintarRespUser(usuarios);
        },
        error: function (jdXHR, textStatus, errorThrown) {
        }
    });
}
function pintarRespUser(usuarios) {
    var fila = '';
    for (i = 0; i < usuarios.length; i++) {
        fila += "<tr>"
        fila += "<td>" + usuarios[i].id + "</td>";
        fila += "<td>" + usuarios[i].identification + "</td>";
        fila += "<td>" + usuarios[i].name + "</td>";
        fila += "<td>" + usuarios[i].address + "</td>";
        fila += "<td>" + usuarios[i].cellPhone + "</td>";
        fila += "<td>" + usuarios[i].email + "</td>";
        fila += "<td>" + usuarios[i].password + "</td>";
        fila += "<td>" + usuarios[i].zone + "</td>";
        fila += "<td>" + usuarios[i].type + "</td>";
        fila += "<td> <a href='#ventana1' class='btn btn-success' data-toggle='modal' onClick='obtItemEspUser(" + usuarios[i].id + ")'>Editar</a>";
        fila += "<td> <button type='button' class='btn btn-danger' onClick='borrarElementoUser(" + usuarios[i].id + ")'>Borrar</button>";
        fila += "</tr>";
    }
    // myTable+="</table>";
    $('#cuerpoUsuarios').html(fila);
}

function borrarElementoUser(idUser) {
    let id = idUser;
    $.ajax({
        // url: "http://localhost:8080/api/user/" + id,
        url: "http://129.151.113.224:8080/api/user/" + id,
        type: "DELETE",
        datatype: "JSON",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        success: function () {
            alert("Se ha eliminado exitosamente");
            traerInfoUser();
        },
        error: function (jdXHR, textStatus, errorThrown) {
            alert("No se ha eliminado exitosamente");
        }
    });
}

function obtItemEspUser(idUser) {
    let id = idUser;
    $.ajax({
        // url: "http://localhost:8080/api/user/" + id,
        url: "http://129.151.113.224:8080/api/user/" + id,
        type: "GET",
        datatype: "JSON",
        success: function (usuario) {
            console.log(usuario);
            $("#userIdEditar").val(usuario.id);
            $("#userIdEditar").attr("readonly", true);
            $("#userIdentificationEditar").val(usuario.identification);
            $("#userNameEditar").val(usuario.name);
            $("#userAddressEditar").val(usuario.address);
            $("#userCellphoneEditar").val(usuario.cellPhone);
            $("#userEmailEditar").val(usuario.email);
            $("#userPasswordEditar").val(usuario.password);
            $("#userZoneEditar").val(usuario.zone);
            $("#userTypeEditar").val(usuario.type);
        },
        error: function (jdXHR, textStatus, errorThrown) {

        }
    });
}


function editarInfoUser(){
    let myData ={
        id: $("#userIdEditar").val(),
        identification: $("#userIdentificationEditar").val(),
        name: $("#userNameEditar").val(),
        address: $("#userAddressEditar").val(),
        cellPhone: $("#userCellphoneEditar").val(),
        email: $("#userEmailEditar").val(),
        password: $("#userPasswordEditar").val(),
        zone: $("#userZoneEditar").val(),
        type: $("#userTypeEditar").val()
    };
    $.ajax({
        // url: "http://localhost:8080/api/user/update",
        url: "http://129.151.113.224:8080/api/user/update",
        type: "PUT",
        data: myData,
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(myData),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        success: function (respuesta) {
            $("#userIdEditar").val(""),
            $("#userIdentificationEditar").val(""),
            $("#userNameEditar").val(""),
            $("#userAddressEditar").val(""),
            $("#userCellphoneEditar").val(""),
            $("#userEmailEditar").val(""),
            $("#userPasswordEditar").val(""),
            $("#userZoneEditar").val(""),
            $("#userTypeEditar").val(""),
            alert("Se ha actualizado exitosamente");
            traerInfoUser();
        },
        error: function (jdXHR, textStatus, errorThrown) {
            alert("No se ha actualizado exitosamente");
        }
    });
}