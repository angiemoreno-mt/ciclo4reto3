function registrarProductos() {
    if (validarCampos() == true) {

        let myData = {
            reference: $("#prodReferenceRe").val(),
            category: $("#prodCategoryRe").val(),
            size: $("#prodSizeRe").val(),
            description: $("#prodDescriptionRe").val(),
            availability: $("#prodAvailabilityRe").val(),
            price: $("#prodPriceRe").val(),
            quantity: $("#prodQuantityRe").val(),
            photography: $("#prodPhotographyRe").val()
        };
        $.ajax({
            // url: "http://localhost:8080/api/clothe/new",
            url: "http://129.151.113.224:8080/api/clothe/new",
            type: "POST",
            data: myData,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(myData),
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            success: function () {
                alert("Se ha registrado exitosamente");
                window.location.reload();
            },
            error: function (jdXHR, textStatus, errorThrown) {
                alert("No se ha registrado exitosamente");
            }
        });
    }
}




function validarCampos() {
    if ($("#prodReferenceRe").val().length == 0 || $("#prodCategoryRe").val().length == 0 ||
        $("#prodSizeRe").val().length == 0 || $("#prodDescriptionRe").val().length == 0 ||
        $("#prodAvailabilityRe").val().length == 0 || $("#prodPriceRe").val().length == 0 ||
        $("#prodQuantityRe").val().length == 0 || $("#prodPhotographyRe").val().length == 0) {
        alert("Alguno o varios campos están vacios");
        return false;
    } else {
        return true;
    }

}



