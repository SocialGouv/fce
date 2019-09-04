# Comment créer des comptes utilisateurs dans Minio ?

## Prérequis

- Installation de Docker : https://docs.docker.com/install/
- Installation Ansible : https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html

Docker est utilisé afin de déployer un script qui créera les comptes utilisateurs.
Ansible Vault sert à chiffrer les secrets du fichier ```values.yaml```.


## Utilisateurs et mots de passe par défault


Pour FCE, les comptes ont été instanciés avec la demande initiale. 
Pour voir les mots de passes et nom d'utilisateurs par défault, ouvrez un terminal depuis le dossier ```./fce ``` : 

```
$ cd .minio
$ ansible-vault edit values.yaml
```

Note : 
- Pour le mot de passe du fichier ```values.yaml```, demandez à l'équipe OPS.
- **Le fichier ```values.yaml``` est sensible car il contient les noms et mots de passe utilisateurs. Il ne doit donc jamais être poussé non-chiffré sur un repo.**
- Lorsqu'un utilisateur se connecte pour la première fois, il faut qu'il pense à changer son mot de passe.

## Créer de nouveaux comptes dans Minio 

Pour créer de nouveaux comptes utilisateurs dans Minio, il suffit d'overrider les valeurs que le fichier ```values.yaml``` contient. 
Une fois déchiffré, il se présente sous la forme suivante :

```

minio_credentials:
  alias: <alias_du_serveur_minio>
  url: <url_du_serveur_minio>
  access_key: <username_admin_du_serveur_minio>
  secret_key: <mot_de_passe_admin_du_serveur_minio>

minio_accounts:
  - name: <nom_du_groupe_d'utilisateur1>
    users:
      - name: <user1>
        password: <mot_de_passe_1>
      - name: <user2>
        password: <mot_de_passe_2>
  - name: <nom_du_groupe_d'utilisateur2>
    users:
      - name: <user3>
        password: <mot_de_passe_3>
...
```


- Déchiffrer le fichier ```values.yaml``` : 
```
$ cd .minio
$ ansible-vault decrypt values.yaml
```

Note : Pour le mot de passe du fichier  ```values.yaml```, demander à l'équipe OPS.

- Définir les valeurs désirées dans ```values.yaml```.

- Lancer la création des comptes
```
$ docker-compose up
```

- Une fois le script terminé, il faut se connecter une première fois avec le compte admin, puis se déconnecter.

- Chiffrer à nouveau le fichier ```values.yaml```
```
$ ansible-vault encrypt values.yaml
```
 
- Définir un nouveau mot de passe pour le fichier ```values.yaml```. 


**Une fois que vous avez défini un nouveau mot de passe pour le fichier ```values.yaml``` , vous devenez responsable de votre Minio.**
 
