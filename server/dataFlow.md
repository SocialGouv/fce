# Data Flow


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


## Tables

### Etablissements

Formé par SIENE et SESE

Clé | Format | Libellé ?
-- | -- | --
siret |
nic_ministere |
siren |
code_cj3 | | o
raison_sociale |
nom |
prenom |
enseigne |
nom_commercial |
sigle |
code_etat | | o
date_de_l_etat | ddmmyy
code_naf2_10 |
code_naf2_38 |
code_activite |
date_debut_activite | mmddyy
ancien_code_ape |
code_qualite_siege | | o
nic_du_siege |
code_ut_du_siege |
siege_et_region |
siege_et_departement |
code_tutelle |
tranche_eff__insee | | o
annee_tranche_eff_ | ddmmyy
dernier_eff__physique |
date_der_eff_physique | ddmmyy
source_dernier_eff_phy | | o
eff_physique_extrait |
date_eff_phy_extrait | ddmmyy
source_eff_phy_extrait |
dernier_effectif_etp |
date_der_eff_etp | ddmmyy
source_dernier_eff_etp |
code_employeur |
date_employeur | mmddyy
date_de_creation | ddmmyy
code_modalite_activ_ | | o
code_car__saisonnier |
code_car__auxiliaire |
code_marchand |
code_accepte_refuse |
code_region | | o
code_departement |
code_ut |
code_section |
date_debut_section | mmddyy
code_rivoli_de_la_voie |
numero_dans_la_voie |
code_indice_repetition |
code_type_de_voie |
libelle_voie |
complement_adresse |
code_postal |
code_commune |
libelle_commune |
annee_idcc |
codes_idcc | | o



### Intéractions

Pourraient être intégré à Etablissements (mais plus tard).

Formé à partir des 3 fichiers intéractions DIRECCTE

### Nomenclature

Formé à partir de nomenclature.
```javascript
{
  "code_activite_NAF" : {
    "011Z": {
      code: "011Z",
      label: "Culture de céréales (à l'exception du riz), de légumineuses et de graines oléagineuses"
    },
    "0112Z": {
      code: "0112Z",
      label: "Culture du riz"
    },
    ...
  },
  "code_CJ3": {
    "10XX":{
      code: "10XX",
      label: "Personne physique"
    },
    "2110":{
      code: "2110",
      label: "Indivision entre personnes physiques"
    },
    ...
  },
  "code_qualite_siege": {
    "1": {
      code: "1",
      label: "Siège de direction sans autre activité"
    }, ...
  },
  "code_modalite_activ_" : { ... },
  "tranche_effectif" : { ... },
  "source_dernier_eff_phy" : {
    "110": {
      code: "110",
      label: "Effectif de l'entreprise à la création (CFE-SIRENE)",
      label_court: "EFF_CREAT"
    }, ...
   },
   "codes_IDCC" : { ... },
   "code_etat" : { ... },
   "code_region" : { ... }
}
```
