<?php

session_start();

require 'flight/Flight.php';


$link = pg_connect("host=localhost dbname=postgres user=postgres password=postgres");


if (!$link) {
    die('Erreur de connexion'. mysqli_connect_error());
  } else {
    echo 'Succès... ';
  }

// ----------------------------------------------------------------------

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


//-------------Connexion table PotsgreSQL-----------------




Flight::route('/carte', function(){


    Flight::render('carte');

});



Flight::start();
?>


//haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
