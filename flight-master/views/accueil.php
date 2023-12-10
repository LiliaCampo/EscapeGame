<!DOCTYPE html>
<html lang="fr">
  
    <head>
        <meta charset="UTF-8">
        <title>EscapeGame Horreur</title>
        <link rel="stylesheet" href="/assets/styleaccueil.CSS">
        <link href="https://fonts.bunny.net/css?family=Akronim" rel="stylesheet"/>
        
    </head>
    

    <body>
        <div class="entete">
        <audio id="myAudio" loop autoplay>
            <source src="images/Day-of-Chaos(chosic.com).mp3" type="audio/mp3">
            <!--Pour activer le son automatiquement sur google chrome, aller dans paramètre ->confidentialité et sécurité -> paramètre des sites ->  paramètre de contenu supplémentaires ->mettre localhost dans ajouter à lire des sons   -->
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