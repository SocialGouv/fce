//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/github-actions.env";

jest.setTimeout(1000 * 60);
test("kosko generate --prod", async () => {
  expect(
    await getEnvManifests("prod", "", {
      ...project("fce").prod,
      GITHUB_REF: "v1.2.3",
      GITHUB_SHA: "0123456789abcdefghijklmnopqrstuvwxyz0123",
      SOCIALGOUV_PRODUCTION: "true",
      RANCHER_PROJECT_ID: "c-gjtkk:p-8j5hf",
  })).toMatchSnapshot();
});
