/**
 * @file app.js
 * @brief Ejemplo de utilización de Conteo Regresivo. 
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 */ 

 /**
  * Core 
  */
 $(document).ready(function () {
 
    // MAGIA I
    //const contador = $("#countdown").countdown(); 
    const contador = $("#countdown").countdown({
        'hide': false, 
        'totalTime': 20, 
        //'showTime': 19, 
        'onComplete': function() {
            console.log('Todas las cosas llegan a su final'); 
        }
    }); 

    $('#detener').click(function () {
        contador.stop(); 
    });     

    $('#arrancar').click(function () {
        contador.start(); 
    });     
});