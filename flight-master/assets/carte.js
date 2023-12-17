//console.log("coucou");

/************************carte*********************/

var zoom_min = 0;
var zoom_max = 25;
var zoom_actuel = 19;

var map = L.map('map', {minZoom : zoom_min}).setView([35.707529564411864, 139.76302385330203],zoom_actuel);

var group = L.featureGroup();
group.addTo(map);

/**********************markers**********************/

Vue.createApp({
    data() {
        return {
            objets_carte : [],
            markers : [],
            objets_inv : [],
            texte : '',
            just_clicked : null,
            last_clicked : null,
            objet_unblocked_name : '',
            indications : '50m E ; 150m N ; 50m E ; 150m N ; 170m E ; 60m N ; 180m E ; 40m N.'
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
        this.carte();
        //this.invent();
        this.textegen();
    },
    methods: {
        submit(){
            return; // on empêche le rechargement par défaut
        },
        carte(){ //à metttre dans computed pour mise à jour auto ?
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
        },/*
        invent(){
            fetch('/invent_start', {
                method: 'post',
                body: '',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(r => r.json())
            .then(r => {
                for (let i = 0; i < r.res.length; i++){
                    data = r.res[i];
                    this.objets_inv.push(data);
                }
            })
        },*/
        textegen(nouveau){
            this.texte = nouveau;
            return this.texte;
        },
        clicked(obj){
            this.last_clicked = this.just_clicked;
            this.just_clicked = obj;
            let just = this.just_clicked;
            let last = this.last_clicked;
            console.log(last, just);
            if (just.nom == 'monsieur' && this.objets_carte.includes(just)){this.monsieur();}
            else if (just.objet_recuperable=='t' && this.objets_carte.includes(just)){this.objet_recovering();}
            else if (just.objet_bloque_par_objet=='t' && (last.nom == just.objet_qui_bloque)){this.objet_recuperable_par_objet();}
            else if (just.objet_code=='t' && this.objets_carte.includes(just)){this.objet_recovering();}
            else if (just.objet_bloque_par_code=='t' && this.objets_carte.includes(just)){this.objet_recuperable_par_code()}
            else {console.log("c'est caca")}
        },
        mouseovered(obj){
            this.textegen(obj.description);
            //ajouter indice
            if (obj.nom == 'monsieur' && this.objets_inv.includes(obj)){
                this.textegen(this.indications);
            }
        },
        monsieur(){
            //console.log(this.objets_inv);
            if (this.last_clicked.nom == 'carte_de_visite'){
                this.textegen('Monsieur : "あなたはわかりません。"');
                let index_donne = this.objets_inv.indexOf(this.last_clicked);
                this.objets_inv.splice(index_donne,1);
            }
            else if(this.last_clicked.nom == 'dictionnaire' && this.objets_inv.includes(this.last_clicked)){
                this.textegen('Monsieur : "' + this.indications + '"');
                this.objet_recuperable_par_objet();
            }
            else{this.textegen('Monsieur : "???"')};
        },
        objet_recuperable_par_objet(){
            console.log('on récupère.');
            let index_donne = this.objets_inv.indexOf(this.last_clicked); //last_clicked est l'objet qui permet de récupérer
            this.objets_inv.splice(index_donne,1);
            this.objet_recovering();

            this.objet_unblocked_name = this.just_clicked.objet_debloque;
            //console.log(this.objet_unblocked_name);
            this.objet_unblocking();
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
        objet_recuperable_par_code(){
            let code_entry = prompt("Rentrer le code de la chambre d'hôtel :");
            while (code_entry !=this.just_clicked.code_qui_bloque){
                let mauvais = prompt("Mauvais code, veuillez réessayer :");
                code_entry=mauvais;
            }
            this.objet_recovering();
            this.objet_unblocked_name = this.just_clicked.objet_debloque;
            this.objet_unblocking();
        }




    }

}).mount('#objecting');



/**********************fonctions**********************/

map.addEventListener('click',function(e){
    console.log(e.latlng);
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
