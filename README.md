# Frontend - React Application

## Introduction

Ce projet utilise **React** pour la construction du frontend. L'application permet aux utilisateurs de gérer des transactions via une interface graphique. Elle communique avec un backend Java via des API REST pour récupérer et envoyer des données.

---

## Prérequis

Avant de démarrer l'application frontend, vous devez avoir installé les outils suivants sur votre machine :

- **Node.js** et **npm** (version 14 ou supérieure)
  - Vérifiez que Node.js et npm sont installés en exécutant les commandes suivantes :
    ```bash
    node -v
    npm -v
    ```

- Un **éditeur de texte** comme **Visual Studio Code**.

---

## Installation

### Étape 1 : Cloner le Repository

Clonez le projet depuis votre dépôt Git :

```bash
git clone https://votre-repository-url.git
cd nom_du_projet
Étape 2 : Installer les Dépendances
Dans le répertoire du projet, installez toutes les dépendances nécessaires en exécutant la commande suivante :

bash
Copier le code
npm install
Cette commande va installer les dépendances définies dans le fichier package.json du projet.

Étape 3 : Configurer l'URL de l'API Backend
Le frontend communique avec le backend Java via des requêtes HTTP. Vous devez configurer l'URL de l'API dans un fichier .env.

Créez un fichier .env à la racine du répertoire frontend/ (s'il n'existe pas déjà).
Ajoutez la ligne suivante pour définir l'URL de l'API backend :
env
Copier le code
REACT_APP_API_URL=http://localhost:8080/api/v1
Cela permet de relier votre frontend au backend en local.

Étape 4 : Démarrer l'application
Une fois les dépendances installées et l'API configurée, vous pouvez démarrer l'application en mode développement avec la commande suivante :

npm start
Cela va démarrer le serveur de développement React et ouvrir l'application dans votre navigateur à l'adresse suivante :

http://localhost:3000

Le projet utilise plusieurs bibliothèques pour faciliter le développement :

React : La bibliothèque JavaScript pour créer l'interface utilisateur.
Axios : Pour effectuer des requêtes HTTP vers l'API backend.
React Router : Pour gérer la navigation entre les différentes pages.
Material-UI : Bibliothèque de composants React pour une interface cohérente et moderne.
dotenv : Pour gérer les variables d'environnement.
Commandes
Voici les commandes courantes utilisées pour gérer le projet :

Démarrer l'application en mode développement :

npm start

