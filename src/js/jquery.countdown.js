/**
 * @file jquery.countdown.js
 * @brief jQuery plugin to implement a countdown.
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 * @version 0.1
 * @requires jQuery v1.4.2 or later
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * jquery.countdown.js is a jQuery plugin to implement a countdown.
 *
 */

/**
 * @name jQuery
 * @class
 * See the jQuery Library  ({@link https://jquery.com/}) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * @name fn
 * @class
 * See the jQuery Library  ({@link https://jquery.com/}) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in. 
 * @see {@link https://learn.jquery.com/plugins/ The jQuery Plugin Guide}
 * @memberOf jQuery
 */

; (function ($, window, document) {

    /**
     * countdown() provides a mechanism for implement a countdown.
     *
     * If an options Object is provided, the following attributes are supported:
     *
     * @since 0.1
     * hide:    Hide the counter in the init. 
     *          Default value: true 
     *
     * @since 0.1
     * timeStamp:   Stamp that will be replaced by the time. 
     *              Default value: '##' 
     *
     * @since 0.1
     * totalStamp:  Stamp that will be replaced by the total time. 
     *              Default value: '@@' 
     * 
     * @since 0.1
     * classTitle:  Class name for the title DIV. 
     *              Default value: 'title' 
     * 
     * @since 0.1
     * classTimer:  Class name for the timer DIV. 
     *              Default value: 'timer' 
     * 
     * @since 0.1
     * classFinal:  Class name for the optional final DIV. 
     *              Default value: 'final' 
     * 
     * @since 0.1
     * step:    Total of milliseconds between calls. 
     *          Default value: 1000 
     *
     * @since 0.1
     * totalTime:   Total amount of time on the counter. 
     *              Default value: 60
     *
     * @since 0.1
     * showTime:    Time when the counter is displayed.
     *              Default value: totalTime 
     * 
     * @since 0.1
     * texts:   Texts and legends associated with the display of the counter.
     *          Default value: {}
     * 
     * @todo
     * onStart: Callback function to call after start the countdown. 
     *          Default value: {}
     * 
     * @todo
     * onStop:  Callback function to call after stop the countdown. 
     *          Default value: {}

     * @since 0.1
     * onShow:  Callback function to call after the time reach certain value {@link options#showTime}. 
     *          Default value: {} 
     * 
     * @since 0.1
     * onComplete:  Callback function to call after the timer reach zero. 
     *              Default value: {} 
     * 
     */

    /**
     * @typedef Texts
     * @type {Object}
     * @property {String} title Text for the title of the counte
     * @property {String} timer Text pattern for the timer area of the counter
     * @property {String} final Text patter for the timer area of the counter when the time runs out
     */

    /**
     * @typedef Options
     * @type {Object}
     * @property {Boolean} hide Hide the counter in the init
     * @property {String} timeStamp Stamp that will be replaced by the time
     * @property {String} totalStamp    Stamp that will be replaced by the total time
     * @property {String} classTitle    Class name for the title DIV
     * @property {String} classTimer    Class name for the timer DIV
     * @property {String} classFinal    Class name for the optional final DIV
     * @property {Texts} texts Texts and legends associated with the display of the counter
     * @property {Number} step  Total of milliseconds between calls
     * @property {Number} totalTime Total amount of time on the counter
     * @property {Number} showTime  Time when the counter is displayed 
     * @property {Function} onStart Callback function to call after start the countdown 
     * @property {Function} onStop  Callback function to call after stop the countdown
     * @property {Function} onComplete Callback function to call after the timer reach zero
     * @property {Function} onShow Callback function to call after the time reach certain value {@link options#showTime} 
     */

    /**
     * Modificamos el texto si nos queda tiempo en el contador 
     * @function updateTimerText
     * @param {HTMLElement} dom Elemento HTML que contiene el contador 
     * @param {Number} time Tiempo restante en el contador 
     * @private
     * @memberOf jQuery.fn
     */
    function updateTimerText(dom, time) {

        /** 
         * Vamos a recuperar el texto según el tiempo restante en el contador 
         */
        let texto = (time === 1) ? $.restoreformOptions.texts.final : $.restoreformOptions.texts.timer;

        /**
         * Vamos a actualizar el contador 
         */
        $(`#${dom.id} ${$.restoreformOptions.classTimer}`).html(texto
            .replace($.restoreformOptions.timeStamp, time)
            .replace($.restoreformOptions.totalStamp, $.restoreformOptions.totalTime)
        );
    }

    /**
     * jquery.countdown.js - jQuery plugin to implement a countdown.
     *
     * @class
     * @name countdown
     * @memberOf jQuery.fn
     */
    $.fn.countdown = function (options) {

        /**
         * @type {jQuery}
         * @memberof jQuery.fn.countdown
         */
        var element = this;

        /**
         * @type {HTMLElement}
         * @memberof jQuery.fn.countdown
         */
        var dom;

        /**
         * Option defaults
         * @type {Options}
         * @memberof jQuery.fn.countdown
         */
        options = $.extend({
            hide: this.attr('hide') || true,
            timeStamp: this.attr('timeStamp') || '##',
            totalStamp: this.attr('totalStamp') || '@@',
            classTitle: this.attr('classTitle') || '.title',
            classTimer: this.attr('classTimer') || '.timer',
            classFinal: this.attr('classFinal') || '.final',
            texts: this.attr('texts') || {},
            step: this.attr('step') || 1000,
            totalTime: this.attr('totalTime') || 15,
            showTime: this.attr('showTime') || null,
            onStart: this.attr('start') || function () { },
            onStop: this.attr('stop') || function () { },
            onComplete: this.attr('onComplete') || function () { },
            onShow: this.attr('onShow') || function () { },
        }, options || {});

        /** 
         * Valor por defecto para showTime {@link options#showTime}
         */
        if (options.showTime === null) {
            options.showTime = options.totalTime;
        }

        /**
         * Store these options so they'll be available to the other functions
         * @type {Options}
         */
        $.restoreformOptions = options;

        /**
         * Arrancar contador
         * @function start
         * @public
         * @memberOf jQuery.fn.countdown
         */
        this.start = function () {
            this.init(this.time);
            if (options.onStart) {
                options.onStart();
            }
        }

        /**
         * Detener contador
         * @function stop 
         * @public
         * @memberOf jQuery.fn.countdown
         */
        this.stop = function () {
            clearInterval(this.intervalTimer);
            if (options.onStop) {
                options.onStop();
            }
        }

        /**
         * Reiniciar contador
         * @function reset 
         * @public
         * @memberOf jQuery.fn.countdown
         * @see jQuery.fn.updateTimerText
         */
        this.reset = function () {

            /**
             * Reiniciamos el contador 
             * @type {Number}
             */
            this.time = options.totalTime;

            /**
             * Modificamos el texto si nos queda tiempo en el contador 
             */
            if (options.hide === false) {
                updateTimerText(dom, this.time);
                return false;
            }

            /**
             * Ocultamos el contador 
             */
            $.when($(`#${dom.id}`).fadeOut(options.step / 2))
                .then(
                    function () {
                        setTimeout(
                            function () {
                                $(`#${dom.id} ${options.classTitle}`).html(options.texts.title);
                            },
                            options.step / 2
                        );
                    }
                );
        }

        /**
         * Actualizar contador
         * @function update 
         * @public
         * @memberOf jQuery.fn.countdown
         * @see jQuery.fn.updateTimerText
         */
        this.update = function () {

            /**
             * Modificamos el texto si nos queda tiempo en el contador 
             */
            if (this.time) {
                updateTimerText(dom, this.time);
            }

            /**
             * Si el tiempo ha llegado al umbral apropiado {@link options#showTime} mostramos el contador
             */
            if (this.time === options.showTime) {
                $(`#${dom.id}`).fadeIn(options.step / 2);
                if (options.onShow) {
                    options.onShow();
                }
            }

            /** 
             * Si el tiempo ha terminado entonces tenemos que reiniciar el contador y opcionalmente llamar 
             * a la función onComplete {@link options#onComplete}
             */
            if (this.time === 0) {
                this.reset();                       // Vamos a reiniciar el contador 
                if (options.onComplete) {
                    options.onComplete();
                }
            } else {
                /**
                 * Sino ... pues decrementamos el contador 
                 */
                this.time--;
            }
        }

        /**
         * Iniciar el Contador
         * @function init 
         * @param {Number} [start] Marca de tiempo en la que iniciará el contador. Por defecto será igual al total {@link options#totalTime}
         * @public
         * @memberOf jQuery.fn.countdown
         * @see jQuery.fn.updateTimerText
         */
        this.init = function (start) {

            /**
             * Definimos la cantidad de tiempo que tenemos para iniciar 
             * @name time
             * @type {Number}
             * @memberof jQuery.fn.countdown
             */
            this.time = start || options.totalTime;

            /**
             * Iniciamos el contador ({@link update} y {@link options#step})
             * @name intervalTimer
             * @type {Number}
             * @memberof jQuery.fn.countdown
             */
            this.intervalTimer = setInterval($.proxy(this.update, this), options.step);

            /**
             * Obtenemos algunos textos desde el elemento que queremos convertir en contador 
             * @name texts 
             * @type {Texts}
             * @memberof jQuery.fn.countdown
             */
            this.texts = {
                'title': $(`#${dom.id} ${options.classTitle}`).html() || 'COUNTDOWN',
                'timer': $(`#${dom.id} ${options.classTimer}`).html() || '##',
                'final': $(`#${dom.id} ${options.classFinal}`).html() || '1',
            }

            // Check options.texts is empty 
            if (jQuery.isEmptyObject(options.texts)) {
                options.texts = this.texts;
            }

            /**
             * Modificamos el texto si nos queda tiempo en el contador 
             */
            updateTimerText(dom, this.time);

            /**
             * Revelamos el Contador si esa es nuestra voluntad 
             */
            if (options.hide === false) {
                $(dom).show();
            }
        }

        /**
        * Main 
        */
        this.each(function () {

            /** 
             * Resguardamos el selector para más adelante
             */
            dom = this;
        });

        /**
         * Ocultar el Contador hasta que sea necesario revelarlo al mundo 
         */
        $(dom).hide();

        // Iniciar 
        this.init();

        // ... 
        return this;
    };
})(jQuery, window, document);