//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/github-actions.env";

jest.setTimeout(1000 * 60);
test("kosko generate --dev", async () => {
  expect(
    await getEnvManifests("dev", "", {
      ...project("fce").dev,
      CI_COMMIT_TAG: "",
      CI_COMMIT_SHA: "",
      GITHUB_SHA: "0123456789abcdefghijklmnopqrstuvwxyz0123",
      RANCHER_PROJECT_ID: "c-gjtkk:p-8j5hf",
    })
  ).toMatchSnapshot();
});
