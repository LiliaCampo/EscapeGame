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


//-------------Route objets carte starter PotsgreSQL-----------------

Flight::route('POST /objets_start', function(){
    $connect = Flight::get('db');
    $geom = [];
    $resultsgeom = pg_query($connect, "SELECT ST_AsGEOJson(point) AS geom, * FROM objet WHERE depart;");
    $geom=pg_fetch_all($resultsgeom);
    Flight::json(['req' => $geom]);
});


//-------------Route objet débloqué PotsgreSQL-----------------

Flight::route('POST /debloque', function(){
    $id = $_POST['objetdebloque'];
    $connect = Flight::get('db');
    $result = pg_query($connect, "SELECT ST_AsGEOJson(point) AS geom, * FROM objet WHERE nom = '".$id."';");
    $results=pg_fetch_all($result);
    Flight::json(['req' => $results]);
});


Flight::start();
?>

