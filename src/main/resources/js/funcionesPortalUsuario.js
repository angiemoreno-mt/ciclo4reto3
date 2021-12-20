// function traerInfoUser() {
//     let user = sessionStorage.getItem()
//     $.ajax({
//         // url: "http://localhost:8080/api/user/all",
//         url: "http://129.151.113.224:8080/api/user/"+idUser,
//         type: "GET",
//         datatype: "JSON",
//         success: function (usuarios) {
//             console.log(usuarios);
//             pintarRespUser(usuarios);
//         },
//         error: function (jdXHR, textStatus, errorThrown) {
//         }
//     });
// }
function traerUser() {
    let user = sessionStorage.getItem("user");
    let userJS = JSON.parse(user);
    let typeUser;
    console.log(user);
    if(userJS.type=="ASE"){
        typeUser = "Asesor Comercial";
    }
    else if(userJS.type=="COORD"){
        typeUser = "Coordinador de Zona";
    }
    else{
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

function reDireccionar(){
    let user = sessionStorage.getItem("user");
    let userJS = JSON.parse(user);
    if(userJS.type=="ASE"){
        window.location ="inicioAsesorOrders.html";
    }
    else if (userJS.type=="COORD"){
        window.location ="inicioCoordOrders.html";
    }
    else{
        console.log("No encontrado");
    }
}
