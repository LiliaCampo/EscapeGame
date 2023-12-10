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
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    </head>
    <body>
        <div id="map"></div>

        <div id = "tracker">
            <p id="coordsAffiche"></p>
        </div>

        <div id="heure">
            <p id="tempsAffiche"></p>
        </div>
        
        <div id="texteExplicatif">
        
        </div>
        
        <table>
        <?php 
        if(isset($req[0])){
            foreach($req[0] as $elem){
                echo "<tr><td>".$elem['point']."</td><td>".$elem['nom']."</td></tr>";
            }
        }
        ?>
        </table>

        <script src = "/assets/carte.js"></script>

    </body>
    
</html>