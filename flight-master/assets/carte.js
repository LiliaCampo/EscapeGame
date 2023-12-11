console.log("coucou");

/************************carte*********************/

var zoom_min = 0;
var zoom_max = 25;
var zoom_actuel = 19;

var map = L.map('map', {minZoom : zoom_min}).setView([35.707529564411864, 139.76302385330203],zoom_actuel);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoom_max,
    maxNativeZoom : 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



/**********************objets**********************/

let objects = Vue.createApp({
    data() {
        return {
            coords : [],
        }
    },
    computed: {
    },
    mounted() {
        this.marker();
    },
    methods: {
        marker(){
            fetch('/objets', {
                method: 'post',
                body: '',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(r => r.json())
            .then(r => {
                for (let i = 0; i < r.req.length; i++){
                    data = r.req[i];
                    //console.log(data);
                    let lat = JSON.parse(data.geom).coordinates[0];
                    let lon = JSON.parse(data.geom).coordinates[1];
                    let sizee = data.size.substring(1, data.size.length - 1).split(",").map(Number);

                    let icone = L.icon({iconUrl : '../images/' + data.url,iconSize:sizee})

                    var marker = L.marker([lat, lon],{icon:icone}).addTo(map);
                }
            })
        }
    }
}).mount('#objecting');


/**********************fonctions**********************/

function objetVisible(objet, minZoomVisible){
    if (zoom_actuel >= minZoomVisible){
        objet.addTo(map);
    }
    else {
        map.removeLayer(objet);
    }
}

map.addEventListener('zoomend',function(){
    zoom_actuel = map.getZoom();
    console.log(zoom_actuel);
    objetVisible(dictionnaire,20);
    objetVisible(couteau,20);
    objetVisible(coord_hotel,21);
    objetVisible(mari,21);
    objetVisible(journal,23);
})

//Partie sur l'implémentation du compteur
function compteur() {
    let tempsAffiche = document.getElementById('tempsAffiche');

    if (tempsAffiche) {
        let tempsDebut = new Date().getTime();

        function boucle() {
            let tempsActuel = new Date().getTime();
            let tempsÉcoulé = tempsActuel - tempsDebut;

            let heures = Math.floor(tempsÉcoulé / 3600000);
            let minutes = Math.floor((tempsÉcoulé % 3600000) / 60000);
            let secondes = Math.floor((tempsÉcoulé % 60000) / 1000);

            // Formater le temps
            let tempsFormate = ajouterZero(heures) + ':' + ajouterZero(minutes) + ':' + ajouterZero(secondes);

            tempsAffiche.innerText = tempsFormate;

            setTimeout(boucle, 1000);
        }

        function ajouterZero(nombre) {
            return (nombre < 10 ? '0' : '') + nombre;
        }

        boucle();
    } else {
        console.error("L'élément avec l'ID 'tempsAffiche' n'a pas été trouvé.");
    }
};

function coords() {
    let coordsAffiche = document.getElementById('coordsAffiche');

    if (coordsAffiche) {
        map.addEventListener("mousemove", function(e) {
            let lon = Math.round(e.latlng.lng * 100000000)/100000000;
            let lat = Math.round(e.latlng.lat * 100000000)/100000000;

            let coordsFormate =lat + ', ' + lon;

            coordsAffiche.innerText = coordsFormate;
            });
    } else {
        console.error("L'élément avec l'ID 'coordsAffiche' n'a pas été trouvé.");
    }
};

document.addEventListener("DOMContentLoaded", compteur(), coords());
