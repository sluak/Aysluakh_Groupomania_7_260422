# OpenClassrooms - Groupomania Projet 7
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le
but de cet outil est de faciliter les interactions entre collègues. Mise en place du backend, du frontend et de la base de données.

# Technologies used
Database: MySQL

Backend: Node.js + Express + Sequelize

Frontend: Vue 3 js + Vite

Requis pour ce projet :

Version Node.js v16.15.1.

Recommandé : MySQL Workbench ( Interface de gestion de votre base de données)

# BASE DE DONNEES
Une base donnée est nécessaire pour le fonctionnement du site web.
Se connecter au serveur MySql de votre choix. Exécuter la commande : CREATE DATABASE groupomania; Compléter vos identifiants dans le fichier db.config.json du dossier Backend

# BACKEND
A partir du dossier Backend dans un nouveau terminal de votre éditeur exécuter la commande:

```sh
npm install
```
```sh
node server ou nodemon serve si il est présent dans votre machine
```

Si la connexion a réussi, vous verrez ce message :

```sh
Listening on port 3000

```

# FRONTEND

```sh
npm install
```
```sh
npm run dev
```

Si la connexion a réussi, vous verrez ce message :

  vite v2.9.9 dev server running at:
  > Local: http://localhost:3001/
  
Vous pouvez accéder à l’application : http://localhost:3001/

# UTILISATION DE L'APPLICATION

Pour s'inscrire sur le réseau social interne de Groupomania, il vous faut :

•	Une adresse électronique valide

•	Un username (longueur min. 3 caractères, pas de symboles)

•	Un mot de passe (au minimum 8 caractères, 1 majuscule et 1 chiffre, pas de symboles).

Après l'enregistrement vous pouvez vous connecter à l'application dans la page de profil vous pouvez ajouter plus d'informations, changer votre photo, changer l'email si c'est nécessaire. Votre compte peut être supprimé.
Dans l'application, vous pouvez voir les publications de tous les utilisateurs, vous pouvez les commenter, vous pouvez créer vos propres publications avec des images, vous pouvez les modifier et les supprimer.

Pour se connecter en tant qu'administrateur :

// username = admin

//email = admin@gmail.com

// password = Aa12345+
