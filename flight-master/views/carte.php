<html>
    <head>
        <title>Carte Escape Game</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
         <link rel="stylesheet" href = '/assets/carte.CSS'/>
         <!-- Make sure you put this AFTER Leaflet's CSS -->

         <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>
    </head>
    <body>
        <div id="map">
        <script src = "/assets/carte.js"></script>
        </div>

        <div id="heure">
            <p id="tempsAffiche"></p>
        </div>
        
        <div id="texteExplicatif">
        bonjour  <?php echo $log ?>
        </div>
        
    </body>
    
</html>