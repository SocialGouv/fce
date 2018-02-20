# API Client

## Entreprise
```javascript
const siren = "418166096";
dataClient.APIGouv.getEntreprise(siren);
dataClient.SIENE.getEntreprise(siren);
```

## Etablissement
```javascript
const siret = "41816609600069";
// ## API Gouv
dataClient.APIGouv.getEtablissement(siret);
dataClient.APIGouv.getAssociation(siret);
dataClient.APIGouv.getDocumentsAssociation(siret);
dataClient.APIGouv.getAttestationsAGEFIPH(siret);
dataClient.APIGouv.getExercices(siret);

// ## Raw access
dataClient.SIENE.getEtablissement(siret);

dataClient.SESE.get(siret);

dataClient.EOS.get(siret);
dataClient.SORA.get(siret);
dataClient.wikiT.get(siret);

// Helpers
dataClient.DIRECCTE.getInterventions(siret)
.then( interventions ){
  /*
      interventions : [
        {
          date: "",
          unite_controle: "",
          type_intervention: "",
          cible_intervention: "",
          pole: ""
        },
        { ... }
       ]
  */
};

dataClient.DIRECCTE.getAllInfos(siret)
.then( data ){
  /*
      etablissement: { ... },
      SESE: { ... }, 
      interventions : [
        {
          date: "",
          unite_controle: "",
          type_intervention: "",
          cible_intervention: "",
          pole: ""
        },
        { ... }
       ]
  */
};

```

* GET https://entreprise.api.gouv.fr/v2/entreprises_legacy/:siren
* GET https://entreprise.api.gouv.fr/v2/etablissements_legacy/:siret
* GET https://entreprise.api.gouv.fr/v2/associations/:id
* GET https://entreprise.api.gouv.fr/v2/documents_associations/:association_id
* GET https://entreprise.api.gouv.fr/v2/attestations_agefiph/:siret
* GET https://entreprise.api.gouv.fr/v2/exercices/:siret
