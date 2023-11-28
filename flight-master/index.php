<?php

require 'flight/Flight.php';
session_start();
Flight::route('/', function () {
    Flight::render('accueil');
});



Flight::route('POST /identification', function() {
    if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
        Flight::render('identification', ['log'=>$_SESSION['user']]);
    }else{
        Flight::render('identification', ['log'=>null]);
    }
});

Flight::route('/carte', function(){
    Flight::render('carte');

});



Flight::start();
?>
