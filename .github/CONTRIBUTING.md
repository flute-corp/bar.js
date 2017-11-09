# Bar.js Contributing Guide

Hey ! Vous aussi vous voulez partager l'apéro dans les règles de l'art ? Alors vous êtes à la bonne adresse !

Ici, on est pas au bar. Alors il y a quelques règles à observer...
- [Code of Conduct](https://github.com/DardalusDev/bar.js/blob/master/.github/CODE_OF_CONDUCT.md)
- [Pull Request](#pull-request)
- [Tests](#tests)
- [Project Structure](#project-structure)

## Pull Request

- Globablement, on ne travaille pas sur la branche `master`, elle doit être utilisée uniquement pour une release **Ne faites jamais un Pull request directement dessus...**

- Travaillez sur la branch `dev`

- Travailler uniquement sur le dossier `src`. La `dist` est générée automatiquement.

- Pensez à faire un `npm test` et assurez vous que tous les tests passent. (C.F. [Tests](#tests))

- Si vous ajoutez de nouvelles fonctionnalités :
  - Ajoutez tous les cas de tests necessaires à la couverture du code.
  - Ajoutez une fonctionnalité pertinente vis à vis du projet... (Pas de flûte en JS SVP)

- Si vous corrigez un bug :
  - S'il provient d'une issue, ajoutez `(fix #xxxx[,#xxx])` (#xxxx == id issue) pour une meilleure traçabilité.
  - Si c'est vous qui l'avez découverte (merci !), préciser le cas couvert par la correction.
  - Dans les deux cas, n'oubliez pas de mettre à jour les tests en conséquence.

## Installation du projet

Vous aurez besoin de [Node.js](http://nodejs.org) **version 6+**

``` bash
git clone https://github.com/DaedalusDev/bar.js.git
cd bar.js
npm install
```

## Commandes grunt disponibles
``` bash
grunt monitor       // Watch "dev" "tests" "realFavicon"
grunt dev           // Générer bar.js
grunt tests         // Execute les tests unitaires
grunt realFavicon   // Générer le favicon
grunt release       // Générer bar.min.js
```

## Tests

Pour tester le code avec un watch pendant votre dev : 

``` bash
$ grunt monitor
```

Pour tester le code (avec Karma): 

``` bash
$ npm test
```

## Project Structure

- **`dist`**: Contient le code final de l'application, minifié avec `grunt release`

- **`src`**: Travaillez dans ce dossier.

- **`tests`**: Dossier des tests du projet
    - **`specs`**: Les fichiers doivent mapper les fichiers de `src` en finissant par `Spec`.

## Credits

Merci à tous pour votre contribution à Bar.js !