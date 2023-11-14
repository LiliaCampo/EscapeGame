<html>
    <head>
        <title>formulaire</title>
        
        <title>Le jeu va bientôt commencer...</title>
</head>
<body>
<h2>Une fois identifié, l'objectif est simple. Il faut récupérer un maximum d'indice sur la carte pour résoudre l'égnigme. Attention, l'heure tourne....</h2>
<?php
    if(isset($log) && !empty($log)){
        echo "<p>Bonjour :" . $log."</p>";
        echo "<a href='/traitement_formulaire?deco=true'>Logout</a>";
    }
    else{echo '<form method="GET" action="/traitement_formulaire">
        <div>
          <label>Pseudo: <input type="text" name="user"></label>
        </div>
        <div>
          <button>Lancement du jeu</button>
        </div>
        </form>';}

?>
</body>
</html>