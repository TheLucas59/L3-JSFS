# TP Pong - Lucas Plé

## Mise en place 

1. Cloner le dépôt
```
git clone https://gitlab-etu.fil.univ-lille1.fr/ple/jsfs_g2_2022.git
```

2. Compiler les fichiers
```
cd jsfs_g2_2022/tp3/client
npm run build
```

3. Lancer le serveur
```
cd ../server
nodemon
```

4. Se connecter au serveur sur un navigateur à l'adresse :
```
http://localhost:8080/public/index.html
```

## Fonctionnement

### Raquettes et balle
Les raquettes et la balle sont des objets contenus dans la classe Game qui gère le déroulement du jeu. Ces objets ont leur propres propriétés comme leur coordonnées dans le canvas, leur vitesse ou encore le chemin de l'image qui les caractérise. Le plus gros du travail dans ces classes était de gérer les collisions entre l'une et l'autre. En effet, la balle sera amenée à toucher l'une ou l'autre des raquettes présentes dans le jeu et elle devra rebondir dessus. Dans un premier temps, il faut détecter la collision entre la balle et une des raquettes. On peut faire ça en calculant des points sur la position des objets et de leur image pour créer des rectangles. Si on trouve une intersection entre le rectangle d'une raquette et celui de la balle, on considère qu'une collision a lieu. Il faut ensuite changer les caractéristiques de la balle pour qu'elle soit redirigée dans l'autre sens, de sorte que les joueurs puissent réaliser des échanges avec la balle. Pour complexifier le jeu, les raquettes sont divisées en segments (6 ici) : 3 au-dessus du milieu de la raquette, 3 en-dessous. En fonction du segment de la raquette sur lequel la balle rebondit, on lui donnera un angle différent caractérisé par ses attributs de vitesse sur les axes X et Y. Une autre collision a gérer est celle de la balle avec les bords gauche et droit du canvas. En effet, c'est dans ce cas qu'un joueur ou l'autre marque un point. Etant donné que la coordonnée X de la balle correspond au bord haut gauche de l'image correspondant à l'objet, On peut regarder directement si elle est inférieure à zéro dans le cas du bord gauche, ou que la coordonnée X plus la largeur de l'image de la balle dépasse la largeur du canvas. Dans ces deux cas là, on augmente le score de l'un des deux joueurs en fonction du côté de la collision et on ré initialise le jeu pour repartir avec une balle au centre. Les raquettes ont, quant à elle, le traitement de leurs déplacements, vers le haut ou vers le bas. On change simplement leur coordonnée Y et leur vitesse sur l'axe Y pour qu'elles se déplacent sur l'écran. Ces fonctions sont appelées lorsque le joueur appuie sur une flèche directionnelle de son clavier.

### Communications
Pour que le jeu soit jouable en ligne, il faut pouvoir communiquer entre les deux clients qui souhaitent jouer l'un contre l'autre. On ne peut pas les faire communiquer directement de client à client, il faut donc que le serveur serve d'intermédiaire entre les deux clients. 

Dans un premier temps, lorsqu'un client se connecte à la page, le jeu se charge et essaie de se connecter au serveur de socket. S'il y a déjà deux clients connectés au serveur, sa socket sera déconnecté et il ne pourra pas participer au jeu. Lors de la connexion, le serveur va ajouter la socket à une liste. En fonction de la taille courante de cette liste, le serveur va envoyer un message à la socket nouvellement connectée qui lui permet de savoir quel joueur cette socket représente. C'est utile pour laisser le joueur 1 lancer la partie, désactiver des boutons pour le joueur 2 etc. Lorsque 2 joueurs sont connectés, le serveur leur envoie un message signifiant que la partie est prête à être lancée. Seul le joueur 1 peut alors lancer la partie. Quand il appuie sur le bouton "Jouer", il envoie un message au serveur signifiant que la partie a commencé. Ce message a pour but d'être retransmis au deuxième joueur pour que le jeu se déclenche aussi sur son écran. Des communications entre les clients et le serveur se font à différents moments :
1. Lorsque les joueurs déplacent leurs raquettes, un message est transmis au serveur pour que ce-dernier informe l'autre client que la raquette du premier joueur a bougé. Cela permet au client de mettre à jour la position de son adversaire
1. Lorsqu'une collision est détéctée avec une des deux raquettes sur le cient du joueur 1, un message de synchronisation est transmis au serveur puis à l'autre joueur pour s'assurer que le jeu se déroule correctement. Ces messages contiennent les coordonnées de la balle formées après la collision pour que le client du deuxième joueur mette la balle dans la même configuration que le premier joueur
1. Lorsque la balle touche un des deux murs, un message est émis pour transmettre le nouveau score et s'assurer que les clients ont le même score affiché.
1. Enfin, lorsqu'un joueur se déconnecte durant la partie, il envoie un message juste avant de se déconnecter au serveur pour que ce-dernier déconnecte également l'autre joueur, lui expliquant que son adversaire s'est déconnecté.

La classe `Game` gère la plupart des envois de ces messages ainsi que leur réception et les conséquences qu'ils impliquent à la situation du jeu.

La classe `IOController` côté serveur joue le rôle d'intermédiaire entre les clients et se charge de transmettre un message qu'un des deux clients envois au serveur et qui est destiné à l'autre client.

### Evolution
Cette version du projet répond au cahier des charges du sujet donné, on peut cependant penser à d'autres fonctionnalités à rajouter dans une perspective d'évolution de ce jeu. `Socket.io` permet la création de "salles" privées où des sockets peuvent se connecter. Je pense qu'il est possible d'utiliser cette fonctionnalité pour ajouter des spectateurs à la partie, plutôt que de déconnecter les joueurs qui se sont connectés trop tard. Les "salles" permettent d'envoyer un message à tous les abonnés de cette salle, il serait alors possible pour le serveur de transmettre également les messages de synchronisation et de données de jeu à la "salle" de spectateur, leur permettant ainsi de visualiser la partie en cours.

Comme évoqué à la fin du sujet, on pourrait également implémenter un système de chat au jeu mais je n'ai pas eu le temps pour l'implémenter.

On pourrait également imaginer un système de compte où les joueurs pourraient se connecter sans être anonyme et enregistrer leurs parties. Ils pourraient également avoir accès à un historique. Il faudrait pour ça avoir une base de données qui contiendrait les utilisateurs et au moins un fichier au format CSV répertoriant les matchs. Ce fichier pouvant vite devenir volumineux si beaucoup de parties sont joués, la base de données semble être un meilleur choix, d'autant plus que cela sera bien plus simple d'accéder aux matchs d'un joueur en particulier pour afficher son historique de partie.

### Difficultés rencontrées
Le point sur lequel j'ai eu le plus de difficultés sur ce projet était la gestion des collisions entre la balle et les raquettes, mais également la division des raquettes en segments qui ne me semblaient pas très intuitif au premier abord. J'ai finalement trouvé un équilibre dans les nombres de segments donnant un résultat satisfaisant et la balle ne prend pas d'angle étrange lorsqu'elle rebondit sur les raquetes.

Je n'ai pas vraiment eu de difficultés sur la partie réseau et `socket.io` car j'ai déjà pu manipuler cette librairie lors de mon stage de DUT Informatique, où j'envoyais des messages lorsqu'un utilisateur réalisait une interaction sur l'application pour former des logs.