import { formatAppSearchResults, formatAppSearchPagination } from "./AppSearch";

describe("AppSearch utils", () => {
    describe("formatAppSearchResults", () => {
        it("should format valid results", () => {
            const appSearchResults = {
                rawResults: [{
                    "enterprise_name": { "raw": "VARENNES SPORTS ET LOISRS" },
                    "activiteprincipaleetablissement": { "raw": "93.12Z" },
                    "lastdsntrancheeffectifsetablissement": { "raw": "-" },
                    "siret": { "raw": "80335561900013" },
                    "trancheeffectifsetablissement": { "raw": null },
                    "id": { "raw": "80335561900013" },
                    "libellecommuneetablissement": { "raw": "VARENNES-LES-MACON" },
                    "siren": { "raw": "803355619" },
                    "etatadministratifetablissement": { "raw": "A" },
                    "activiteprincipaleetablissement_libelle": { "raw": "Activités de clubs de sports" },
                    "etablissementsiege": { "raw": "true" },
                    "codepostaletablissement": { "raw": "71000" },
                    "enseigne1etablissement": { "raw": null }
                }]
            };

            expect(formatAppSearchResults(appSearchResults)).toEqual([{
                "enterprise_name": "VARENNES SPORTS ET LOISRS",
                "activiteprincipaleetablissement": "93.12Z",
                "lastdsntrancheeffectifsetablissement": "-",
                "siret": "80335561900013",
                "trancheeffectifsetablissement": null,
                "id": "80335561900013",
                "libellecommuneetablissement": "VARENNES-LES-MACON",
                "siren": "803355619",
                "etatadministratifetablissement": "A",
                "activiteprincipaleetablissement_libelle": "Activités de clubs de sports",
                "etablissementsiege": "true",
                "codepostaletablissement": "71000",
                "enseigne1etablissement": null
            }])
        });
    });

    describe("formatAppSearchPagination", () => {
        it("should format valid pagination", () => {
            const appSearchPagination = {
                info: { meta: { page: { current: 1, size: 2, total_pages: 3, total_results: 4 } } }
            };

            expect(formatAppSearchPagination(appSearchPagination)).toEqual({
                current: 1,
                size: 2,
                pages: 3,
                items: 4
            });
        });
    });
});