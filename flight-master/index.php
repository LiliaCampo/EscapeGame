<?php

session_start();

require 'flight/Flight.php';

//echo '1';

//$link = mysqli_connect('localhost', 'postgres', 'postgres', 'postgres');
//$link = pg_connect("host=localhost dbname=postgres user=postgres password=postgres");

//$link = mysqli_connect('u2.ensg.eu', 'geo', '', 'geobase');
//$link = pg_connect("host=u2.ensg.eu dbname=geobase user=geo password=null");

//echo '2';
/*
if (!$link) {
    die('Erreur de connexion'. mysqli_connect_error());
  } else {
    echo 'Succès... ';
  }
*/
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




Flight::route('POST /carte', function(){
    if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
        Flight::render('carte', ['log'=>$_SESSION['user']]);
    }else{
        Flight::render('carte', ['log'=>null]);
    }

    Flight::render('carte');

});



Flight::start();
?>

