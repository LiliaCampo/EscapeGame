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

Flight::route('POST /identification', function() {
    Flight::render('identification');
    }

);




Flight::route('POST /carte', function(){
    $_SESSION['user'] = $_POST['user'];
    if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
        Flight::render('carte', ['log'=>$_SESSION['user']]);
    } else {
        Flight::render('carte', ['log'=>null]);
    }
});


//-------------Route markers PotsgreSQL-----------------

Flight::route('POST /objets', function(){
    $connect = Flight::get('db');
    $geom = [];
    $resultsgeom = pg_query($connect, "SELECT nom, ST_AsGEOJson(point) AS geom, url, size, minzoomvisible FROM objet WHERE point IS NOT NULL and depart;");
    $geom=pg_fetch_all($resultsgeom);
    Flight::json(['req' => $geom]);
});


//-------------Route inventaire PotsgreSQL-----------------

Flight::route('POST /invent', function(){
    $connect = Flight::get('db');
    $inv = [];
    $results = pg_query($connect, "SELECT nom, url FROM objet WHERE inventaire;");
    $inv=pg_fetch_all($results);
    Flight::json(['res' => $inv]);
});


Flight::start();
?>

