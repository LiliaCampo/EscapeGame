/*

//ici mon vue.create n'est pas définis, il ne sait pas ce que c'est ???
//problème du trackeur aussi, pas sûr qu'il me fais le truc correctement
let track = Vue.createApp({
    data() {
      return {
  
        time: {
          minutes: 0,
          secondes: 0,
          millisecondes : 0,
        },
        etat: {
          run: true,
          stop: false
        },
      };
    },
    methods: {
        start () {
          var temps = track.time.minutes + " min " + track.time.secondes + " sec " + track.time.millisec + " millisec";
          if (this.etat.run){
            chronoStart();
            this.etat.run = false;
            
          }
          else{
            chronoStop();
          }
        },
    
      },
    
    }).mount('#tracker');
  
*/
/**************** chrono  ******************************* */
/*
let totalSecondes = 0;
let startTime = Date.now();
let sec = 0
let min = 0
let millisec = 0;
var timer;


chronoStart = function() {
  timer = setInterval(function() {
    let now = Date.now();
    let diff = new Date(now-startTime)
    track.time.minutes = diff.getMinutes();
    track.time.secondes = diff.getSeconds();
    track.time.millisec = diff.getMilliseconds();
  }, 1);

  setEtat(false, true);
};

chronoStop = function() {
  clearInterval(timer);
  setEtat(true, false);
};

setEtat = function(run, stop) {
  track.etat.run = run;
  track.etat.stop = stop;     
};

*/