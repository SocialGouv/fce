import React from "react";
import Data from "./SharedComponents/Data";
import Config from "../../../services/Config";
import { getSuccession } from "../../../helpers/Establishment";

import Subcategory from "./SharedComponents/Subcategory";
class EstablishmentActivity extends React.Component {
  render() {
    const { establishment } = this.props;
    const succession = getSuccession(
      establishment.successeur,
      establishment.predecesseur
    );

    return (
      <section id="activity" className="enterprise-section">
        <h2 className="title is-size-4">Activité</h2>
        <Data
          dataName="Activté principale"
          dataValue={`${establishment.naf ? establishment.naf : "-"} ${
            establishment.libelle_naf ? establishment.libelle_naf : "-"
          }`}
        />
        <Data
          dataName="Date de création"
          dataValue={establishment.date_creation}
          dataEmptyValue="-"
        />
        <Data
          dataName="Association"
          dataValue={!!establishment.association}
          dataEmptyValue="-"
        />
        {establishment.association &&
        establishment.document_association &&
        establishment.document_association.url ? (
          <span>
            <span>télécharger le document de l'association</span>
            <a
              href={establishment.document_association.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              les derniers statuts
            </a>
          </span>
        ) : null}
        <Subcategory
          subtitle="Lien de succession"
          datas={[
            {
              dataName: "SIRET prédecesseur/successeur",
              dataValue: succession && succession.siret,
              dataEmptyValue: "pas de prédecesseur ou de successeur",
              dataNonEmptyValue: ""
            },
            {
              dataName: "Date du transfert",
              dataValue: succession && succession.date_transfert,
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            }
          ]}
        />
        <Subcategory
          subtitle="Effectifs"
          datas={[
            {
              dataName: "Tranche Effectif INSEE",
              dataValue: Config.get("inseeSizeRanges")[
                establishment.tranche_effectif_insee
              ],
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            },
            {
              dataName: "Année tranche effectif INSEE",
              dataValue: establishment.annee_tranche_effectif_insee,
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            },
            {
              dataName: "Dernier effectif connu",
              dataValue: establishment.dernier_effectif_physique,
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            },
            {
              dataName: "Date dernier effectif connu",
              dataValue: establishment.date_dernier_effectif_physique,
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            }
          ]}
        />
        <Subcategory
          subtitle="Développement économiques"
          datas={[
            {
              dataName: "Filière stratégique",
              dataValue:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].filiere,
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            },
            {
              dataName: "ETI / PEPITE",
              dataValue:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].eti_pepite,
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            },
            {
              dataName: "Adhérent à un pole de compétitivité",
              dataValue:
                Array.isArray(establishment.pole_competitivite) &&
                !!establishment.pole_competitivite.length,
              dataEmptyValue: "-",
              dataNonEmptyValue: ""
            }
          ]}
        />
      </section>
    );
  }
}

export default EstablishmentActivity;
