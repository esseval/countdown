jquery.countdown.min.js
=========================

A jQuery plugin to implement a countdown. 

## Usage
Step 1: include JQuery and jquery.countdown.js in your page

    <script src="jquery.js"/>
    <script src="jquery.countdown.min.js"></script>

Step 2: define the html counter

    <!-- DIV con el Contador --> 
    <div id="countdown" style="display:none; " class="countdown">
        <div class="final" style="display:none; ">1 SEGUNDO</div>
        <div class="title"><b>ACTUALIZANDO LA PÁGINA EN ... </b></div>
        <div class="timer">## SEGUNDOS DE @@</div>
    </div>

Step 3: initialize the plugin

    // Basic (60 seconds)
    const contador = $("#countdown").countdown(); 

    // Always visible counter with 20 seconds
    const contador = $("#countdown").countdown({
        'hide': false, 
        'totalTime': 20
    }); 

    // Counter with Custom onComplete and onShow Functions 
    const contador = $("#countdown").countdown({
        'hide': false, 
        'totalTime': 20, 
        'onComplete': function() {
            console.log('Todas las cosas llegan a su final'); 
        },
        'onShow': function() {
            console.log('Era hora de que aparecieras'); 
        },
    });     

Step 4: stop counter

    contador.stop(); 

Step 5: start counter

    contador.start(); 

## License
You may use jquery.countdown.min.js under the terms of the MIT License. [More information](http://en.wikipedia.org/wiki/MIT_License).