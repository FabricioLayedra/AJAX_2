function cargarEmpresas(){
    $.ajax({
            url: 'servicios_basicos.xml',
            error: function() {
                alert('¡error al cargar el archivo con los servicios!')
            },
            dataType: 'xml',
            success: function(data) {
                $(data).find('servicio').each(function() {
                    var nombre = $(this).find('nombre').text();
                    var li = $('<li></li>');

                    li.append(nombre + "<br>");
                    var tipo = $(this).attr("tipo");
                    $('#lista-empresas').append(li);
                    li.click(function(){
                        var container =$('<div></div>');
                        var ul = $('<ul></ul>');
                        let fil = $('<p></li>');
                        container.attr("class","servicios");
                        let suma = 0;
                        lista =document.getElementsByClassName("servicios");
                        if (lista!= null){
                            for (element of lista){
                                element.parentNode.removeChild(element);
                            }
                        }
                        $.getJSON("gastos_personales.json", function(data) {
                            $.each(data, function(key, val) {
                                let nombres = val["nombre"];
                                let servicios = val["servicios"];
                                for (servicio of servicios){
                                    if (servicio["servicio"]==tipo){
                                        fil.append(nombres + " debe: "+ servicio["deuda"] + " dólares." +"<br>");
                                        suma += parseFloat(servicio["deuda"]);
                                    }
                                }
                                
                            });
                        fil.append("Total de "+ nombre + ": " + suma.toFixed(2) + " dólares."  +"<br>");
                        ul.append(fil);
                        container.append(ul);
                        $('body').append(container);
                    });

                        
                    });
                    
                });
                
                
            },
            type: 'GET'
       });
}

$(window).load(function() {
    cargarEmpresas();
});