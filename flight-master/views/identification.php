<html>
    <head>
        <title>identification</title>
        <link rel="apple-touch-icon" sizes="180x180" href="../images/icon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../images/icon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../images/icon/favicon-16x16.png">
        <link rel="manifest" href="../images/icon/site.webmanifest">
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
        <link rel="stylesheet" href="/assets/styleIdentification.CSS">
        <link href="https://fonts.bunny.net/css?family=Akronim" rel="stylesheet"/>
</head>
<body>
<h2>Une fois identifié, l'objectif est simple. Il faut récupérer un maximum d'indice sur la carte pour résoudre l'égnigme. Attention, l'heure tourne....</h2>
<img class="image_yeux" src="/images/VhkF.gif" alt="yeux_qui_bouge">

<div class="form">
<?php
    echo '
    <form method="post" action="/carte">
    <div>
        <label>Username: <input type="text" name="user"></label>
    </div>
    <div>
        <button>Envoyer</button>
    </div>
    </form>';
    ?>
</div>
</body>
</html>
