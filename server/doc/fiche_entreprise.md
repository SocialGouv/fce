# Fiche Entreprise

Variable | Source | Condition
-- | -- | --
siren | |
raison_sociale | API legacy	|
nom_commercial| API legacy	|
nom | API legacy		| si "forme_juridique_code":null
prenom | API legacy		| si "forme_juridique_code":null
sigle | SIENE |
forme_juridique | API legacy		|
-- | -- | --
ETAT ET ACTIVITE | -- | --
date_immatriculation | API 	|
date_creation | API legacy	|
date_radiation | API legacy	|
etat_administratif + value | API legacy	|
date_mise_a_jour | API legacy	|
-- | -- | --
categorie_entreprise | API 	|
tranche_effectif_salarie_entreprise + intitulé | API 	|
date_reference | API 	|
legacy	nombre_etablissements_actifs | API legacy	|
-- | -- | --
SIEGE SOCIAL | -- | --
siret_siege_social | API legacy	|
numero_voie + type_voie + nom_voie | API legacy	|
complement_adresse + code_postal | API legacy	|
localite | API legacy	|
region_implantation + value | API legacy	|
date_creation_etablissement | API legacy	|
-- | -- | --
MANDATAIRES SOCIAUX | -- | --
Mandataires_sociaux + Nom  | API legacy	|
Mandataires_sociaux + Prenom | API legacy	|
Mandataires_sociaux + fonction | API legacy	|
