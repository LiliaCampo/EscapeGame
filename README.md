Avant de commencer à jouer, quelques points sur les manipulations à effectuer :
- dans EscapeGame>flight_master>bdd , télécharger 'table_objet.csv'
- ouvrir pgAdmin avec user: postgres et password: postgres
- lancer la requête suivante :
  -- Table: public.objet

-- DROP TABLE IF EXISTS public.objet;

CREATE TABLE IF NOT EXISTS public.objet
(
    nom character varying(20) COLLATE pg_catalog."default" NOT NULL,
    point geometry,
    minzoomvisible integer,
    depart boolean,
    objet_recuperable boolean,
    objet_code boolean,
    objet_bloque_par_objet boolean,
    objet_bloque_par_code boolean,
    url character varying(200) COLLATE pg_catalog."default",
    size numeric[],
    longitude double precision,
    latitude double precision,
    objet_debloque character varying(20) COLLATE pg_catalog."default",
    code integer,
    description character varying COLLATE pg_catalog."default",
    objet_qui_bloque character varying COLLATE pg_catalog."default",
    code_qui_bloque integer,
    indice character varying COLLATE pg_catalog."default",
    CONSTRAINT objet_pkey PRIMARY KEY (nom)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.objet
    OWNER to postgres;
- importer la table table_objet.csv avec comme délimiteur ';' et header
- puis lancer la requête suivante :
  UPDATE objet
SET point = ST_GeomFromText('POINT(' || longitude || ' ' || latitude || ')',3857);

- Il faut aussi créer une table hall_of_fame dans cette même base de donnée avec la requête :
Lancer la requête suivante :
-- Table: public.hall_of_fame

-- DROP TABLE IF EXISTS public.hall_of_fame;

CREATE TABLE IF NOT EXISTS public.objet
(
    id integer,
    joueur_nom character varying(255),
    score character varying(20)
)
Ainsi, à chaque authentification dans le jeu, votre pseudo sera présent dans la base.

- Geoserver
Dans le dossier EscapeGame2, il y a un dossier zip workspace.zip qui contient à la fois EscapeGame et EscapeGame2, il a seulement été mal placé sur git. Ainsi ce fichier est à récupérer. C'est l'espace de travail EscapeGame qui est utilisé dans le code, mais il a besoin de EscapeGame2 pour exister. La couche s'appelle objet et utilise le style SLD2 définie dans le workspace EscapeGame2 pour fonctionner.


Maintenant, quelques précisions sur le jeu :

- Il doit être lancé sur le navigateur Chrome.
- Il faut activer l'autorisation du lancement automatique du son à l'affichage de la page d'accueil dans les paramètres du navigateur (Paramètres -> Confidentialité et sécurité -> Paramètres de contenu supplémentaires), pour le plaisir de l'audio, vous pouvez rester au moins 10 secondes sur la page d'accueil.
- Pour une plus grande immersion, nous autorisons et même obligeons l'utilisateur à effectuer de grands zooms normalement impossibles avec Leaflet. Au-delà d'un certain zoom, vous ne verrez sûrement plus les tuiles mais ne vous inquiétez pas, il suffit de dézoomer pour qu'elles réapparaissent.
- Pour "donner" un objet, il suffit de cliquer d'abord sur l'objet à donner situé dans l'inventaire, puis sur l'objet receveur sur la carte.
- Des textes de contextualisation, de description et d'aide sont affichés dans la zone en bas à droite de l'écran, merci d'en prendre compte.

Déroulement du jeu :
- sur Accueil, cliquer sur "Nouvelle partie"
- inscrire votre pseudo, puis cliquer sur "Envoyer"
- la page de jeu s'ouvre, le compteur démarre
- la triche est activable à tout moment grâce à une case à cocher
- récupérer la clé, la carte de visite et l'argent (objets tombés des poches du personnage)
- donner la carte de visite au monsieur japonais, il vous répond en japonais
- se diriger vers l'Ouest, dans un magasin, et y effectuer 1 zoom pour découvrir un dictionnaire à vendre
- "donner" l'argent au dictionnaire avec étiquette, le même dictionnaire sans étiquette apparaît
- récupérer le dictionnaire acheté
- donner le dictionnaire au monsieur japonais, il vous répond avec des directions
- vous pouvez récupérer les indications
- grâce à l'échelle en bas à gauche de la carte, suivre les indications qui vous mènent au restaurant d'où vient la carte de visite
- clique sur l'alliance pour voir apparaître un code
- la description indique des poubelles au Nord du restaurant
- aller vers le Nord, le long du lac
- zoomer sur la poubelle (à l'Ouest du chemin), récupérer le papier avec des coordonnées
- s'aider du tracker de la souris pour aller sur le point décrit sur le papier
- zoomer pour découvrir une porte bloquée par un code
- inscrire le code donné par l'alliance (2711) puis confirmer, vous noterez que si vous testez un code avec un nombre de chiffre supérieur à 4, vous êtes amenés à retenter votre chance en respectant le nombre de chiffre indiqué.
- récupérer le couteau qui vient d'apparaître
- zoomer légèrement dans la pièce pour voir l'homme décédé, le récupérer
- zoomer fortement dans le coin nord de la pièce pour y découvrir un journal intime
- donner la clé au journal intime fermé
- récupérer le journal intime ouvert
- votre temps s'affiche où il y avait le compteur, une fenêtre s'ouvre avec ce qu'il y a écrit dans le journal intime pour comprendre ce qu'il s'est passé
- cliquer sur le bouton "Fin du jeu" qui vient d'apparaître pour retourner à la page d'accueil
