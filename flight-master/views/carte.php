<html>
    <head>
        <title>Carte Escape Game</title>
        <link rel="apple-touch-icon" sizes="180x180" href="../images/icon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../images/icon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../images/icon/favicon-16x16.png">
        <link rel="manifest" href="../images/icon/site.webmanifest">
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
        
        <div id = 'objecting'>
            <div id='inventaire'>
                <div id ="inv" v-for="obj in objets_inv" >
                    <img id='objet' :src='obj.url' @click = 'clicked(obj)' @mouseover = 'mouseovered(obj)'>
                </div>
            </div>
            <div id="zoneTexte">
                Bonsoir <?php echo $log ?>
                <p>{{texte}}</p>
            </div>

        </div>

        
        <script src = "/assets/carte.js"></script>

    </body>
    
</html>