# Data Model

## Introduction

Une entreprise est l'entité légale réprésenté par un SIREN (SIR + ET comme ENreprise) à 9 chiffres.

Une entreprise est consitutée d'au moins 1 établissement (dit "siège").

Ces établissements sont identifiés par un SIREN (SIR + ETablissement).
Le SIREN a la forme suivante : SIRET + NIC (5 chiffres) = 14 chiffres.

---

## Fichiers

* `SIENE.csv`
  * 2.044.606 lignes
  * voir le fichier `format variable SIENE.xls` pour la description
  * fichier de référence
* `Base_SESE.xls`
  * clé : `siret`

### Fichiers Intéractions DIRECCTE

Pour les fichiers suivants, la clé est le `siret` :
* `EOS.xlsx`
* `WikiT.xlsx`
* `SORA.xlsx`

### Fichiers de support
* `Fiche_etablissement.xlsx`
  * maquette Excel avec la source des données
* `Maquette - Prototype FCE_V5.pptx`
* `nomenclature.xlsx`
  * lien entre différents codes et leurs libellés : NAF, CJ3, ...

---

## API GOUV

Documentation : https://entreprise.api.gouv.fr/documentation

### Entreprises

* Table : Entreprises
* Endpoint : GET https://entreprise.api.gouv.fr/v2/entreprises_legacy/:siren

```javascript
{
  entreprise: {
    siren: "418166096",
    capital_social: 509525,
    numero_tva_intracommunautaire: "FR16418166096",
    forme_juridique: "SA à directoire (s.a.i.)",
    forme_juridique_code: "5699",
    nombre_etablissements_actifs: 1,
    nom_commercial: "OCTO-TECHNOLOGY",
    procedure_collective: false,
    raison_sociale: "OCTO-TECHNOLOGY",
    siret_siege_social: "41816609600069",
    code_effectif_entreprise: "22",
    date_creation: 891381600,
    nom: null,
    prenom: null,
    etat_administratif: {
      value: "Actif",
      date_mise_a_jour: 891381600
    },
    date_radiation: null,
    mandataires_sociaux: [
      {
        nom: "HISQUIN",
        prenom: "FRANCOIS",
        fonction: "PRESIDENT DU DIRECTOIRE",
        date_naissance: "1965-01-27",
        date_naissance_timestamp: -155523600,
        dirigeant: true,
        raison_sociale: "",
        identifiant: "",
        type: "PP"
      },
      {
        nom: "NIBOUREL",
        prenom: "CHRISTIAN",
        fonction: "PRESIDENT DU CONSEIL DE SURVEILLANCE",
        date_naissance: "1958-01-09",
        date_naissance_timestamp: -378003600,
        dirigeant: true,
        raison_sociale: "",
        identifiant: "",
        type: "PP"
      }
    ]
  },
  gateway_error: false
}
```

## Etablissements

* Table : Etablissements
* Endpoint : GET https://entreprise.api.gouv.fr/v2/etablissements_legacy/:siret

```javascript
{
  etablissement: {
    siege_social: true,
    siret: "41816609600069",
    naf: "6202A",
    libelle_naf: "Conseil en systèmes et logiciels informatiques",
    date_mise_a_jour: 1420585200,
    etat_administratif_etablissement: {
      value: "Actif",
      date_mise_a_jour: 1108594800
    },
    adresse: {
      l1: "OCTO-TECHNOLOGY",
      l2: "50 AV DES CHAMPS ELYSEES",
      l3: "75008 PARIS 8",
      l4: null,
      l5: null,
      l6: null,
      l7: null,
      numero_voie: "50",
      type_voie: "AV",
      nom_voie: "DES CHAMPS ELYSEES",
      complement_adresse: null,
      code_postal: "75008",
      localite: "PARIS 8",
      code_insee_localite: "75108"
    }
  },
  gateway_error: false
}
```
