# FCE / DIRECCTE national

## Prérequis

Le projet nécessite d'avoir un ssh agent. Vérifiez si la commande suivante renvoie un chemin :
`echo $SSH_AUTH_SOCK`

Si ce n'est pas le cas, il faut mettre en place un ssh-agent sur votre shell.
Voici une procédure rapide utilisant [ssh-find-agent](https://github.com/wwalker/ssh-find-agent):

`sudo curl -o /etc/profile.d/ssh-find-agent.sh https://raw.githubusercontent.com/wwalker/ssh-find-agent/master/ssh-find-agent.sh`

`sudo chmod a+x /etc/profile.d/ssh-find-agent.sh`

`echo "ssh-find-agent -a || eval \$(ssh-agent) > /dev/null" >> ~/.bashrc`

ou, si vous utilisez zsh :

`echo "ssh-find-agent -a || eval \$(ssh-agent) > /dev/null" >> ~/.zshrc`

## Installation (projet)

- Installer Bundler si nécessaire : `sudo gem install bundler`
- Sinon vérifier qu'il est à jour : `sudo gem update bundler`
- Installer le bundle : `bundle` ou `bundle install` à la racine du projet
- `bundle exec c42 install`
- Configurer Prettier sur son IDE : https://prettier.io/docs/en/vim.html
- Configurer les tokens des APIs dans le fichier `server/.env` (LastPass: FCE tokens APIs)
- Ajouter la clé "search-key" pour appsearch dans `server/.env` (https://appsearch.fce.test/as/engines/fce puis cliquer sur "Credentials")

## Contribution

### Gitflow

La numérotation des version se fait sur la base de : vAA.MM.JJ.P

- AA = année (ex : 19)
- MM = mois (ex : 04)
- JJ = jour de début de sprint
- P = patch (par defaut 0) à incrémenter pour chaque hotfix

A la fin d'une itération on ouvre une branche release qu'on ne mergera que quand l'ensemble des tickets sera validé. En cas de retours, on crée une branche issue de cette release (et non develop) qu'on enverra en PR par rapport à la branche release. Une fois validée on pourra mettre à jour develop par rapport à la release.

Cela nous permettra de pouvoir commencer une itération suivante sans mettre à mal le déploiement de la précédente release.

### Nommage des commits

Les messages de commit doivent respecter la convention suivante : grafikart.fr/tutoriels/nommage-commit-1009

La librairie Commitizen permet de saisir facilement des messages de commit en respectant cette convention

Installation

```bash
yarn install
```

Effectuer un commit

```bash
yarn commit
```

Quelques règles propres au projet

- concernant le scope, il peut être découpé en 2 en fonction de la portée, l'idéal par exemple pour un commit sur le composant entreprise du client est de saisir `client:entreprise` dans le pire des cas mettre seulement la 1ère partie ex : `server`

- quand on vous demande si il y a une issue associée, mettre l'url de la carte Trello. (ex : https://trello.com/c/lhyJhStb/78-changer-les-logos-dans-le-footer)

## Troubleshooting

- **Mes modifications dans frentreprise ne sont pas prises en compte**

Au changement de branche le lien entre `frentreprise` et le `server` peuvent se casser, redémarrer le container `frentreprise` devrait régler le problème.

Une manière de voir facilement si le lien est bon est d'écouter le container `server` et de faire une modification sur `frentreprise`, s'il redémarre c'est que tout fonctionne.

## Tests

### Client - Cypress

Les tests de la partie client ont été réalisés avec [Cypress](https://www.cypress.io/)

Pour les exécuter il vous faudra dans un premier temps l'installer :

```shell
# se placer dans le dossier client "cd client"
./node_modules/.bin/cypress install
```

Vous pourrez ensuite lancer l'interface GUI via la commande (vous pouvez utiliser un autre port si celui-ci est déjà utilisé sur votre machine)

**Pour fonctionner les containers `front`, `mongo` et `server` doivent être démarrés**

```shell
# se placer dans le dossier client "cd client"
./node_modules/.bin/cypress open --port 8080 --env host=http://direccte.test
```

### Client - Jest

```shell
c42 front:yarn test
```

### Server

```shell
c42 server:yarn test
```

## Import csv dans postgres

### Developpement

La commande à utiliser pour importer les données est la suivante:

```bash
docker-compose exec server bash -c "yarn shell [script] --id [donnée]"
```

La valeur de `[script]` est à remplacer par `DownloadFile` ou `IngestFile`, l'id des données correspond à la clé principale de l'objet `config` dans `src/server/src/shell/import/config.js`. Par exemple : `interactions_pole_t`, `interactions_pole_3e`, etc.

- commencer par télécharger le fichier :

```bash
docker-compose exec server bash -c "yarn shell DownloadFile --id interactions_pole_t"
```

- puis exécuter la commande suivante pour importer les données dans la base :

```bash
docker-compose exec server bash -c "yarn shell IngestFile --id interactions_pole_t"
```

### Preprod et prod

```bash
docker exec server ash -c "NODE_ENV=production node ./shell/run.js DownloadFile --id interactions_pole_t"

docker exec server ash -c "NODE_ENV=production node ./shell/run.js IngestFile --id interactions_pole_t"
```

