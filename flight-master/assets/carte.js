//console.log("coucou");

/************************carte*********************/

var zoom_min = 0;
var zoom_max = 25;
var zoom_actuel = 19;

var map = L.map('map', {minZoom : zoom_min}).setView([35.707529564411864, 139.76302385330203],zoom_actuel);

var group = L.featureGroup();
group.addTo(map);

var fin2 = false;
var heures = 0;
var minutes = 0;
var secondes = 0;

var triche = L.tileLayer.wms("http://localhost:8080/geoserver/EscapeGame/wms",
            {
                layers: 'EscapeGame:objet',
                format: 'image/png',
                transparent: true,
                tiled : true,
            }
            );

/**********************markers**********************/

Vue.createApp({
    data() {
        return {
            objets_carte : [],
            markers : [],
            objets_inv : [],
            texteintro : "Vous vous trouvez dans une ruelle, seule, la nuit. Vous ne savez pas où vous êtes ni comment vous êtes arrivée là. Tout ce que vous remarquez, ce sont les traces de sang sur votre robe blanche. Tout ce que vous voulez faire, c'est vous remémorer comment et pourquoi vous en êtes arrivée là.",
            texte : "Vous vous trouvez dans une ruelle, seule, la nuit. Vous ne savez pas où vous êtes ni comment vous êtes arrivée là. Tout ce que vous remarquez, ce sont les traces de sang sur votre robe blanche. Tout ce que vous voulez faire, c'est vous remémorer comment et pourquoi vous en êtes arrivée là.",
            indice : '',
            just_clicked : null,
            last_clicked : null,
            objet_unblocked_name : '',
            testcode : '',
            demandecode : false,
            errormsg : 'Mauvais code',
            error : false,
            ctriche: false,
            fin : false,
            temps_final :'',
            cherjournal : "Cher journal, Nous venons d'arriver à Tokyo pour notre lune de miel. Les paysages sont incroyables, je n'aurais jamais imaginé me trouver ici un jour ! Je ne comprends pas du tout la langue et je me sens quelque peu perdue dans cette mégalopole, mais cela ne m'empêche pas d'apprécier la vue. Nous avons prévu d'aller au restaurant ce soir. J'espère que tout se passera bien. En ce moment il est un peu à cran et il a besoin de se défouler plus que d'habitude. Je ne lui en veux pas, cela peut arriver à tout le monde de craquer. Vraiment tout le monde. J'ai hâte de goûter la vraie cuisine japonaise ! À bientôt cher journal."
        }
    },
    computed: {
    },
    mounted() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: zoom_max,
            maxNativeZoom : 25,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        L.control.scale().addTo(map);
        var north = L.control({position: "bottomright"});
        north.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend");
        div.innerHTML = '<img style="max-height:100px;max-width:100px;" src="../images/rosedesvents.png">';
        return div;
        }
        north.addTo(map);
        this.start();
    },
    methods: {
        submit(){
            return; // on empêche le rechargement par défaut
        },
        start(){ //à metttre dans computed pour mise à jour auto ?
            fetch('/objets_start', {
                method: 'post',
                body: '',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(r => r.json())
            .then(r => {
                for (let i = 0; i < r.req.length; i++){
                    let data = r.req[i];
                    this.objets_carte.push(data);
                }
            this.markering();
            map.on('zoomend', ()=>{this.objetVisible();});
            this.objetVisible();
            })
        },
        markering(){
            group.clearLayers();
            //console.log(this.objets_carte);
            this.markers = [];
            for (let i = 0; i < this.objets_carte.length; i++){
                let data = this.objets_carte[i];

                let lat = JSON.parse(data.geom).coordinates[0];
                let lon = JSON.parse(data.geom).coordinates[1];
                let sizee = data.size.substring(1,data.size.length - 1).split(",").map(Number);
                let icone = L.icon({iconUrl : data.url,iconSize:sizee})
                let minZoomVisible = data.minzoomvisible;

                var marker = L.marker([lon, lat],{icon:icone});
                marker.on('click', ()=>{this.clicked(data);});
                marker.on('mouseover', ()=>{this.mouseovered(data);});
                marker.on('mouseout', ()=>{this.mouseouted();});
                this.markers.push([marker,minZoomVisible]);
            }
            this.objetVisible();
        },
        objetVisible(){
            zoom_actuel = map.getZoom();
            for (i=0;i<this.markers.length;i++){
                let marker = this.markers[i][0];
                let minZoomVisible = this.markers[i][1];
                if (zoom_actuel >= minZoomVisible){
                    group.addLayer(marker);
                }
                else {
                    group.removeLayer(marker);
                }
            }
        },
        clicked(obj){
            this.last_clicked = this.just_clicked;
            this.just_clicked = obj;
            let just = this.just_clicked;
            let last = this.last_clicked;
            console.log(last, just);
            if (just.objet_recuperable=='t' && this.objets_carte.includes(just)){this.objet_recovering();}
            else if (just.objet_code=='t'){this.objet_coding();}
            else if (just.objet_bloque_par_objet=='t'){
                let present = false;
                for (i=0;i<this.objets_inv.length;i++){
                    if (this.objets_inv[i].nom == just.objet_qui_bloque){present=true};
                };
                if (!present){this.objet_manquant()}
                else if (last.nom == just.objet_qui_bloque){this.objet_blocked_par_objet();}
                }
            else if (just.objet_bloque_par_code=='t'){
                this.objet_manquant();
                this.demandecode = true;}
            else {console.log("c'est caca")}
            this.ending();
        },
        mouseovered(obj){
            this.texte = obj.description;
            //ajouter indice
            if (obj.nom == 'monsieur' && this.objets_inv.includes(obj)){
                this.texte = this.indications;
            }
        },
        mouseouted(){
            this.texte=this.texteintro;
            this.indice='';
        },
        objet_unblocking(){
            fetch('/debloque', {
                method: 'post',
                body: 'objetdebloque=' + this.objet_unblocked_name,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(r => r.json())
            .then(r => {
                let data = r.req[0];
                this.objets_carte.push(data);
                this.markering();
            })
        },
        objet_recovering(){
            this.objets_inv.push(this.just_clicked); //just_clicked est l'objet à récupérer
            let index_recup = this.objets_carte.indexOf(this.just_clicked);
            this.objets_carte.splice(index_recup,1);
            this.markering();
        },
        objet_blocked_par_objet(){
            let index_donne = this.objets_inv.indexOf(this.last_clicked); //last_clicked est l'objet qui permet de récupérer
            this.objets_inv.splice(index_donne,1);
            this.updating();
        },
        objet_blocked_par_code(){
           if (this.testcode==this.just_clicked.code_qui_bloque){
               this.demandecode=false;
               this.updating();
           }
           else {this.error = true;}
        },
        updating(){
            let index_recup = this.objets_carte.indexOf(this.just_clicked);
            this.objets_carte.splice(index_recup,1);
            this.markering();
            this.objet_unblocked_name = this.just_clicked.objet_debloque;
            this.objet_unblocking();
        },
        objet_coding(){
            let lng = this.just_clicked.longitude;
            let lat = this.just_clicked.latitude;
            let code = this.just_clicked.code;
            var popup = L.popup([lat,lng], {content: code}).openOn(map);
        },
        objet_manquant(){
            let obj_manquant = this.just_clicked.objet_qui_bloque;
            this.texte = "Il vous manque l'objet " + obj_manquant + " pour accéder à cet objet.";
            this.indice = this.just_clicked.indice;
        },
        ending(){
            let k = 0;
            for (i=0;i<this.objets_inv.length;i++){
                if (this.objets_inv[i].nom == 'journal_ouvert' || this.objets_inv[i].nom == 'couteau' || this.objets_inv[i].nom == 'mari' ){k+=1};
            };
            if (k==3){
                fin2 =true;
                this.fin=true;
                if (heures<10){
                    if (minutes<10){this.temps_final = '0' + heures + ':0' + minutes + ':' + secondes}
                    else {this.temps_final = '0' + heures + ':' + minutes + ':' + secondes}}
                else{this.temps_final='TROP NULS'};
                alert(this.cherjournal);
            }
        },
        activerTriche() {
            console.log(this.ctriche);
            if (this.ctriche){
                map.removeLayer(triche);
            }else{map.addLayer(triche);}
            // Utilisation de bringToFront pour amener la couche au premier plan
            triche.bringToFront();
        },
        setupTriche() {
            document.getElementById("ctricheid").addEventListener("click", this.activerTriche);
        },
        /*
        enregistrerScore() {
            // Logique spécifique à Vue pour enregistrer le score
        
            
    
            if (nomJoueur) {
                fetch('/enregistrer_score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'nom=' + encodeURIComponent(nomJoueur) + '&score=' + encodeURIComponent(this.tempsEcoule),
                })
                .then(response => {
                    window.location.href = '/accueil';
                    console.log('Score enregistré avec succès');
                })
                .catch(error => {
                    console.error('Erreur lors de l\'enregistrement du score :', error);
                });
            } else {
                console.error('Le nom du joueur est vide.');
            }
        }
        */
}

}).mount('#objecting');



/**********************fonctions**********************/


//Partie sur l'implémentation du compteur
function compteur() {
    let tempsAffiche = document.getElementById('tempsAffiche');

    if (tempsAffiche) {
        let tempsDebut = new Date().getTime();

        function boucle() {
            let tempsActuel = new Date().getTime();
            let tempsÉcoulé = tempsActuel - tempsDebut;

            heures = Math.floor(tempsÉcoulé / 3600000);
            minutes = Math.floor((tempsÉcoulé % 3600000) / 60000);
            secondes = Math.floor((tempsÉcoulé % 60000) / 1000);

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
