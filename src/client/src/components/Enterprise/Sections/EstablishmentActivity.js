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
          name="Activté principale"
          value={`${establishment.naf ? establishment.naf : "-"} ${
            establishment.libelle_naf ? establishment.libelle_naf : "-"
          }`}
        />
        <Data name="Date de création" value={establishment.date_creation} />
        <Data name="Association" value={!!establishment.association} />
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
              name: succession && succession.label,
              value: succession && succession.datas.siret,
              emptyValue: "pas de prédecesseur ou de successeur",
              nonEmptyValue: "",
              link: "/establishment/" + succession.datas.siret
            },
            {
              name: "Date du transfert",
              value: succession && succession.datas.date_transfert,
              emptyValue: "-",
              nonEmptyValue: ""
            }
          ]}
        />
        <Subcategory
          subtitle="Effectifs"
          datas={[
            {
              name: "Tranche Effectif INSEE",
              value: Config.get("inseeSizeRanges")[
                establishment.tranche_effectif_insee
              ],
              nonEmptyValue: ""
            },
            {
              name: "Année tranche effectif INSEE",
              value: establishment.annee_tranche_effectif_insee,
              nonEmptyValue: ""
            },
            {
              name: "Dernier effectif connu",
              value: establishment.dernier_effectif_physique,
              nonEmptyValue: ""
            },
            {
              name: "Date dernier effectif connu",
              value: establishment.date_dernier_effectif_physique,
              nonEmptyValue: ""
            }
          ]}
        />
        <Subcategory
          subtitle="Développement économiques"
          datas={[
            {
              name: "Filière stratégique",
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].filiere,
              nonEmptyValue: ""
            },
            {
              name: "ETI / PEPITE",
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].eti_pepite,
              nonEmptyValue: ""
            },
            {
              name: "Adhérent à un pole de compétitivité",
              value:
                Array.isArray(establishment.pole_competitivite) &&
                !!establishment.pole_competitivite.length,
              nonEmptyValue: ""
            }
          ]}
        />
      </section>
    );
  }
}

export default EstablishmentActivity;
