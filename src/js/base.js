/**
 * @file base.js
 * @brief Contiene el Javascript general para todos las pantallas 
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 */

/**
 * Reconstruye el control Lista
 * @param {!string} id ID de la lista a reconstruir 
 */
function refreshSelect(id) {
    $(`#${id}`).material_select();
    $(".dropdown-content>li>span").css("color", 'black');
}

/**
 * Reconstruye los controles Lista 
 */
function bootSelect() {
    $('select').each(function () {
        refreshSelect(this.id);
    });
    $(".dropdown-content>li>span").css("color", 'black');

    /** 
     * No se enganie mi entraniable lector ... este codigo esta para arreglar
     * otro problema de Materialize. Eso es todo y nada mas. 
     * 
     * Problema: necesidad de hacer un click inicial en las listas 
     * desplegables. 
     */
    setTimeout(function () {
        $('.select-wrapper').each(function () {
            this.addEventListener('click', e => e.stopPropagation())
        });
    }, 500);
}