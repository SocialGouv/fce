# Fiche Etablissement

Variable | Source | Condition
-- | -- | --
 ENTREPRISE | -- | --
raison_sociale | API legacy		|
nom | API legacy		| si "forme_juridique_code":null
prenom | API legacy		| si "forme_juridique_code":null
siren | API legacy	|
siret_siege_social | API legacy	|
-- | -- | --
ETABLISSEMENT | -- | --
enseigne | API legacy	|
siret | API legacy	|
siege_social= "true" | API legacy	|
numero_voie + type_voie + nom_voie | API legacy	|
complement_adresse + code_postal | API legacy	|
localite | API legacy	|
code_insee_localite - sur 2 premiers caractères | API legacy	|
region_implantation + value | API legacy	|
-- | -- | --
ETAT ET ACTIVITE | -- | --
date_creation | API legacy	|
etat_administratif + value | API legacy	|
date_mise_a_jour | API legacy	|
naf + libelle_naf | API legacy	|
Date_debut_activite | SIENE |
Code_Modalite_activ_ (nomenclature)  | SIENE |
marchand |  API association RNA	 | si etat=true put "non marchand"
etat| API association RNA	 | si etat=true put "id"
url | api document association |
epmloyeur| API etablissement  | si tranche effectif >0 alors put "oui"
tranche_effectif_salarie_etablissement + intitule | API etablissement	|
date_reference | API etablissement 	|
Dernier_eff__physique | SIENE |
Date_der_eff_physique | SIENE |
Source_dernier_eff_phy | SIENE |
-- | -- | --
RELATION TRAVAIL | -- | --
Code_Section + nomenclature | SIENE |
Codes_IDCC | SIENE |
Annee_IDCC | SIENE |
Nombre_IDCC | SIENE |
derniere_annee_de_conformite_connue | API attestation AGEFIPH |
-- | -- | --
DONNEES ECONOMIQUES | -- | --
exercices + date_fin_exercice | API exercices	|
exercices + ca  | API exercices	|
-- | -- | --
INTERVENTIONS PUBLIQUES  | -- | --
EOS_Filiere | SESE |
EOS_ETI\_Pepite_  | SESE |
-- | -- | --
SIAE  | SESE |
aci | SESE |
ai | SESE |
ei | SESE |
etti | SESE |
ACP  | SESE |
ACP_annee1_auto et ACP_annee2_auto | SESE |
ACP_NbH_auto_2016 et ACP_NbH_auto_2017 | SESE |
ACP_Nbh_conso_2016 | SESE |
PSE | SESE |
PSE_annee1 | SESE |
PSE_etat1 | SESE |
PSE_poste1 | SESE |
PSE_annee2 | SESE |
PSE_etat2 | SESE |
PSE_poste2 | SESE |
-- | -- | --
DIRECCTE | -- | --
poleT | wikiT | si SIRET présent put "oui"
poleC | SORA | si SIRET présent put "oui"
pole3E | EOS | si SIRET présent put "oui"

## Sous-fiche Interventions DIRECCTE
Variable | Source T | Source C | Source 3E
-- | -- | -- | -- | -- | --
date | Date_intervention_T | Date_intervention_C | Date_visite_EOS
objet |  |  |
untié | Unite_controle_T | unite_C | Unite_EOS
Type Intervention | Type_intervention_T | | Type_suivi_EOS
Cible intervention | cible_intervention_T | | 
