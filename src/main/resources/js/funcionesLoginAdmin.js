function loginUsuario() {
    if (validarCampos() == true && validarEmail($("#useremailLoUs").val()) == true) {
        
        let emailValor = $("#useremailLoUs").val();
        let passwordValor = $("#passwordLoUs").val();

        $.ajax({
            // url: "http://localhost:8080/api/user/" + emailValor + "/" + passwordValor,
            url: "http://129.151.113.224:8080/api/user/" + emailValor + "/" + passwordValor,
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                if (respuesta.name == "NO DEFINIDO") {
                    alert("Usuario y/o contraseña no coinciden o no se encontro el usuario");
                    window.location.reload();
                } else if(respuesta.type == "ADM"){
                    console.log("El usuario ya existe");
                    alert("Bienvenido " + respuesta.name);
                    paginaInicio();
                    }else{
                        alert("El usuario ingresado no es de tipo ADMINISTRADOR, por favor inicie sesión donde corresponde");
                        window.location.reload();
                    }
            },
            error: function (jdXHR, textStatus, errorThrown) {
                console.log(jdXHR, textStatus, errorThrown);
            }
        });

    }
}


function validarCampos() {
    if ($("#useremailLoUs").val().length == 0 || $("#passwordLoUs").val().length == 0) {
        alert("Alguno o varios campos están vacios");
        return false;
    } else {
        return true;
    }

}

function validarEmail(email) {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)) {
        return true;
    } else {
        alert("El valor ingresado no es un correo electronico");
        return false;
    }
}


function paginaInicio() {
    window.location = "portalAdmin.html";
}