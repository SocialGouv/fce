import { nestcribe_path as test } from "../../tests/utils";

import Entreprise from "./Entreprise";
import Etablissement from "./Etablissement";

test("Entreprise/Etablissement", () => {
  const entrepriseData = { parent_data: "yes" };

  const etablissementData = { some_data: "foobar", bar: "baz" };

  it("constructs with data", () => {
    const ent = new Entreprise(entrepriseData);
    const etab = new Etablissement(etablissementData, ent);

    expect(etab).toBeInstanceOf(Etablissement);
    expect(etab.some_data).toEqual(etablissementData.some_data);
  });

  it("update entreprise data with _etData attribute", () => {
    const ent = new Entreprise(entrepriseData);

    expect(ent.new_data_from_child).toBe(undefined);

    const etab = new Etablissement(
      {
        ...etablissementData,
        _etData: {
          new_data_from_child: "hello"
        }
      },
      ent
    );

    expect(etab).toBeInstanceOf(Etablissement);
    expect(etab.some_data).toEqual(etablissementData.some_data);

    expect(etab._etData).toBe(undefined);

    expect(ent.new_data_from_child).toEqual("hello");
  });

  it("keep _dataSources objects in sync when using _etData attribute", () => {
    const ent = new Entreprise({ entrepriseData, _dataSources: { api: true } });

    expect(ent._dataSources.api).toBeTruthy();
    expect(ent._dataSources.db).toBeFalsy();
    expect(ent._dataSources.ftp).toBeFalsy();

    const etab1 = new Etablissement(
      {
        ...etablissementData,
        _dataSources: { db: true }
      },
      ent
    );

    // Etablissement has not updated Entreprise, datasources should not be synced
    expect(ent._dataSources.api).toBeTruthy();
    expect(ent._dataSources.db).toBeFalsy();
    expect(ent._dataSources.ftp).toBeFalsy();

    const etab2 = new Etablissement(
      {
        ...etablissementData,
        _etData: {
          new_data_from_child: "hello"
        },
        _dataSources: { db: true }
      },
      ent
    );

    // Entreprise has been updated from _etData, _dataSources must have been updated
    expect(ent._dataSources.api).toBeTruthy();
    expect(ent._dataSources.db).toBeTruthy();
    expect(ent._dataSources.ftp).toBeFalsy();

    etab2.updateData({
      _etData: { new_data_from_ftp: true },
      _dataSources: { ftp: true }
    });

    expect(ent._dataSources.api).toBeTruthy();
    expect(ent._dataSources.db).toBeTruthy();
    expect(ent._dataSources.ftp).toBeTruthy();
  });
});
