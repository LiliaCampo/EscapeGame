<html>
    <head>
        <title>identification</title>
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
        <link rel="stylesheet" href="/assets/styleIdentification.CSS">
        <link href="https://fonts.bunny.net/css?family=Akronim" rel="stylesheet"/>
</head>
<body>
<h2>Une fois identifié, l'objectif est simple. Il faut récupérer un maximum d'indice sur la carte pour résoudre l'égnigme. Attention, l'heure tourne....</h2>
<img class="image_yeux" src="/images/VhkF.gif" alt="yeux_qui_bouge">

<div class="form">
<?php
    if(isset($log) && !empty($log)){
        echo "<p>Bonjour : ".$log."</p>";
    }else{
        echo '
        <form method="post" action="/identiifcation">
        <div>
            <label>Username: <input type="text" name="user"></label>
        </div>
        <div>
            <button>Envoyer</button>
        </div>
        </form>';
        }
    ?>
</div>
</body>
</html>
