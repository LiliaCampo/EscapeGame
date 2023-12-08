<?php

session_start();

require 'flight/Flight.php';


$link = pg_connect("host=localhost dbname=postgres user=postgres password=postgres");
// stocker une variable globale
Flight::set('db', $link);

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
    $connect = Flight::get('db');

    // afficher objet sur carte avec bon zoom
    $results = pg_query($connect, "SELECT nom, point, url, size, minzoomvisible FROM objet WHERE point IS NOT NULL;");
    $tab = pg_fetch_all($results);
    

    Flight::render('carte', ['req'=>[$tab]]);

});



Flight::start();
?>


//haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
