$(document).ready(function(){
    'use sctrict';

     var $tick = $('#ticker');
     $tick.data({
        'noticias' : [],
        'noticiaActual': 0
    });
     var $deten = $('#detener');
     var $ant = $('#anterior');
     var $sig = $('#siguiente');
     var $pidiendo = true;
     var $intervalID;



    var mostrarContenido = function(datos){
            var fech= new Date();
            var horas = fech.getHours()+':'+fech.getMinutes()+':'+fech.getSeconds();
            $tick.text(horas+' '+datos);
            $tick.data('noticias').push($tick.text());
            $tick.data('noticiaActual',  $tick.data('noticiaActual')+1);
            $tick.css('background-color', 'yellow');
            setTimeout(limpiarFondo, 300);
        };


    var limpiarFondo = function(){
        $tick.css('background-color', '#fff');
    };


//////////////////////////////////////////////////////////////////////////////////////////////////////////

    var peticion = function(e){
        var $this=$(this);
        $.ajax({
            url : '../servidor/generaContenidos.php',
            dataType: 'text',
            cache: false,
            success : function(data, textStatus,jqXHR){
                mostrarContenido(data);
            },
            error : function(jqXHR, textStatus, errorThrow){
                console.log(errorThrow);
            }
        });
    };

//////////////////////////////////////////////////////////////////////////////////////////////////////////


    var mostrarAnterior= function(e){
        clearInterval($intervalID);
        $pidiendo= false;
        var actual = $tick.data('noticiaActual');
        if(actual > 0){
            $tick.data('noticiaActual', actual-1);
            $tick.text($tick.data('noticias')[ $tick.data('noticiaActual')-1]);
        }
     };


     var mostrarSiguiente= function(e){
        clearInterval($intervalID);
        $pidiendo= false;
        var actual = $tick.data('noticiaActual');
        if(actual < $tick.data('noticias').length-1){
            $tick.data('noticiaActual', actual+1);
            $tick.text($tick.data('noticias')[$tick.data('noticiaActual')]);
        }
     };



     var stopPlayRequest = function(e){
        if ($pidiendo){
            $pidiendo= false;
            clearInterval($intervalID);

        }
        else{
            $pidiendo= true;
            $intervalID = setInterval(peticion,1000);
        }
     };



    $intervalID = setInterval(peticion,1000);


    $(document).on('click','#detener', stopPlayRequest);
    $(document).on('click','#anterior', mostrarAnterior);
    $(document).on('click','#siguiente', mostrarSiguiente);



});

/*
4.1.2 Ejercicio 2

La página HTML proporcionada incluye una zona llamada ticker en la que se deben mostrar noticias generadas por el servidor. Añadir el código JavaScript necesario para:

    De forma periódica cada cierto tiempo (por ejemplo cada segundo) se realiza una petición al servidor mediante AJAX y se muestra el contenido de la respuesta en la zona reservada para las noticias.
    Además del contenido enviado por el servidor, se debe mostrar la hora en la que se ha recibido la respuesta.
    Cuando se pulse el botón "Detener", la aplicación detiene las peticiones periódicas al servidor. Si se vuelve a pulsar sobre ese botón, se reanudan las peticiones periódicas.
    Añadir la lógica de los botones "Anterior" y "Siguiente", que detienen las peticiones al servidor y permiten mostrar los contenidos anteriores o posteriores al que se muestra en ese momento.
    Cuando se recibe una respuesta del servidor, se resalta visualmente la zona llamada ticker.
    Modificar la aplicación para que se reutilice continuamente el mismo objeto XMLHttpRequest para hacer las diferentes peticiones.

*/