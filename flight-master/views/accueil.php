<!DOCTYPE html>
<html lang="fr">
  
    <head>
        <meta charset="UTF-8">
        <title>EscapeGame Horreur</title>
        <link rel="apple-touch-icon" sizes="180x180" href="../images/icon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../images/icon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../images/icon/favicon-16x16.png">
        <link rel="manifest" href="../images/icon/site.webmanifest">
        <link rel="stylesheet" href="/assets/styleaccueil.CSS">
        <link href="https://fonts.bunny.net/css?family=Akronim" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>

    </head>
    

    <body>
        <div class="entete">
        <audio id="myAudio" loop autoplay>
            <source src="images/Day-of-Chaos(chosic.com).mp3" type="audio/mp3">
        </audio>
        <h1>Bienvenue sur l'escape game horreur</h1>
        </div>

        <div class="bouton">
            <form action="/identification" method="post">
            <button type="submit">Nouvelle partie</button>
            </form>
        </div>
        <div class = "finPage">
        <p>déconseillé au moins de 12 ans</p>
        <!--permet de lancer l'audio dès que la page s'activeS-->
        </div>
        
        <div class="hall-of-fame">
        <h2>Hall of Fame</h2>
        <ul>
            <!-- Affichez les meilleurs scores ici -->
            <li>Joueur 1 - Score : 1000 points</li>
            <li>Joueur 2 - Score : 800 points</li>
            <!-- ... Ajout d'autres scores selon nos besoins ... -->
        </ul>
    </div>

    
    </body>
</html>