import { nestcribe_path as test } from "../../tests/utils";

import Entreprise from "./Entreprise";
import Etablissement from "./Etablissement";

test("Entreprise/Entreprise", () => {
  it("constructs with data", () => {
    const entrepriseData = { foo: "bar" };
    const ent = new Entreprise(entrepriseData);

    expect(ent).toBeInstanceOf(Entreprise);
    expect(ent.foo).toEqual(entrepriseData.foo);
  });

  it("has a list of etablissements", () => {
    const ent = new Entreprise();

    expect(ent).toBeInstanceOf(Entreprise);
    expect(ent.etablissements).toBeInstanceOf(Array);
    expect(ent.etablissements.length).toBe(0);
    expect(() => {
      ent.etablissements = "";
    }).toThrow("Cannot set property");
  });

  it("can check if an establishement exists", () => {
    const ent = new Entreprise();
    const siret = "83106781400010";

    expect(ent.hasEtablissement(siret)).toBe(false);
    ent.etablissements.push({ siret });
    expect(ent.hasEtablissement(siret)).toBe(true);
  });

  it("can create an establishement on the fly (unless specified otherwise)", () => {
    const ent = new Entreprise({}, Object);
    let siret = "83106781400010";

    expect(ent.hasEtablissement(siret)).toBe(false);
    const etab = ent.getEtablissement(siret);
    expect(etab).toBeInstanceOf(Object);
    expect(ent.hasEtablissement(siret)).toBe(true);

    siret = "48776861600038";
    expect(ent.hasEtablissement(siret)).toBe(false);
    const etab2 = ent.getEtablissement(siret, false);
    expect(etab2).toBe(null);
    expect(ent.hasEtablissement(siret)).toBe(false);
  });

  it("can update or create establishement when constructing or updating with data", () => {
    const validsiret = "48776861600038";
    const invalidsiret = "invalidsiret";
    const data = {
      _ets: [
        {
          siret: validsiret
        },
        {
          siret: invalidsiret
        }
      ]
    };

    const ent = new Entreprise(data, Etablissement);
    expect(ent.hasEtablissement(validsiret)).toBe(true);
    expect(ent.hasEtablissement(invalidsiret)).toBe(false);

    const ent2 = new Entreprise({}, Etablissement);
    expect(ent2.hasEtablissement(validsiret)).toBe(false);
    expect(ent2.hasEtablissement(invalidsiret)).toBe(false);
    ent2.updateData(data);
    expect(ent2.hasEtablissement(validsiret)).toBe(true);
    expect(ent2.hasEtablissement(invalidsiret)).toBe(false);
  });
});
