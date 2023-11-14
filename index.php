<?php
session_start();
require 'flight/Flight.php';
/*permet de récupérer le pseudo de la personne commencant à jouer*/
Flight::route('GET /traitement_formulaire', function() {
    if(isset($_GET['deco'])){$_SESSION = [];}
     if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
         Flight::render('traitement_formulaire', ['log' => $_SESSION['user']]);
     }
     else{
         Flight::render('traitement_formulaire', ['log' => null]);
    }
});
?>