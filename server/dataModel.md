# Data Model

## Introduction

Une entreprise est l'entité légale réprésenté par un SIREN (SIR + ET comme ENreprise) à 9 chiffres.

Une entreprise est consitutée d'au moins 1 établissement (dit "siège").

Ces établissements sont identifiés par un SIREN (SIR + ETablissement).
Le SIREN a la forme suivante : SIRET + NIC (5 chiffres) = 14 chiffres.

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

## Intéractions

* Table : Interactions_DIRECCTE

```javascript
{
  interactionT: {
    "siret": "79985096100019",
    "date": "1/2/2017",
    "objet": null,
    "unite_controle": "Unité de contrôle n°1 de l'Hérault",
    "type_intervention": "Enquête",
    "cible_intervention": "Etablissement"
    "pole": "T"
  }
}
```

```javascript
{
  interaction3E: {
    "siret": "79985096100019",
    "date": "10/12/2016",
    "objet": null,
    "unite": "TOURISME",
    "type_intervention": "Entreprise labellisée Tourisme&Handicap",
    "cible_intervention": null,
    "pole": "3E"
  }
}
```

```javascript
{
  interactionC: {
    "siret": "79985096100019",
    "date": "1/12/2017",
    "objet": null,
    "unite": "Brigade viticole",
    "type_intervention": null,
    "cible_intervention": null,
    "pole": "C"
  }
}
```


## Associations

* Endpoint : GET https://entreprise.api.gouv.fr/v2/associations/:id

```javascript
{
  association: {
    id: "W751135389",
    titre:
      "ALLIANCE DU COEUR: UNION NATIONALE DES FEDERATIONS ET ASSOCIATIONS DE MALADES CARDIOVASCULAIRES",
    objet:
      "information, soutien, solidarité et accompagnement psycho médico social des personnes malades cardiovasculaires et de leurs proches...",
    siret: "42135938100025",
    siret_siege_social: "42135938100033",
    date_creation: "1993-02-11",
    date_declaration: "2013-06-28",
    date_publication: "1993-03-03",
    date_dissolution: null,
    adresse_siege: {
      complement: "  ",
      numero_voie: "10",
      type_voie: "RUE",
      libelle_voie: "Lebouis",
      distribution: "_",
      code_insee: "75120",
      code_postal: "75014",
      commune: "Paris"
    },
    code_civilite_dirigeant: null,
    civilite_dirigeant: null,
    code_etat: null,
    etat: "true",
    code_groupement: null,
    groupement: "Simple",
    mise_a_jour: "2013-06-28"
  }
}

```

## Documents Associations

* Endpoint : GET https://entreprise.api.gouv.fr/v2/documents_associations/:association_id

```javascript
{
  nombre_documents: 3,
  documents: [
    {
      type: "Statuts",
      url:
        "https://apientreprise.fr/attestations/40ab0b07d434d0417e8997ce7c5afbef/attestation_document_association.pdf",
      timestamp: "1500660325"
    }
  ]
}
```

## Attestations AGEFHIP

* Endpoint : GET https://entreprise.api.gouv.fr/v2/attestations_agefiph/:siret

```javascript
{
  derniere_annee_de_conformite_connue: "2016",
  dump_date: 1490693291
}
```

## Exercices

* Endpoitn :GET https://entreprise.api.gouv.fr/v2/exercices/:siret

```javascript
{
  exercices: [
    {
      ca: "648374448",
      date_fin_exercice: "2016-12-31T00:00:00+01:00",
      date_fin_exercice_timestamp: 1483138800
    },
    {
      ca: "491463386",
      date_fin_exercice: "2015-12-31T00:00:00+01:00",
      date_fin_exercice_timestamp: 1451516400
    },
    {
      ca: "473899061",
      date_fin_exercice: "2014-12-31T00:00:00+01:00",
      date_fin_exercice_timestamp: 1419980400
    }
  ]
}
```
