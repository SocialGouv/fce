/** Parameters to get a valid `registry/project/image:tag` harbor path */
export interface GithubRegistryImageProps {
  /** name of the docker image */
  name: string;
  /** name of the project */
  project: string;
}

/**
 * Extracts raw version from "vX.X.X" and "v.X.X.X"
 * @param versionTag
 */
const extractVersion = (versionTag: string) => {
  const match = /^v\.?([0-9]+\.[0-9]+\.[0-9])$/.exec(versionTag);

  return match ? match[1] : null;
};


/**
 *
 * This function will return the full path for a given docker image based on `CI_COMMIT_TAG` or `CI_COMMIT_SHA`
 *
 * ```typescript
 * import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils"
 *
 * const imagePath = getGithubRegistryImagePath({
 *   name: "docker-mario",
 *   project: "sre",
 * })
 *
 * ```
 * @category utils
 * @return {string}
 */
export const getGithubRegistryImagePath = ({
 name,
 project,
}: GithubRegistryImageProps): string => {
  const githubTag = process.env.GITHUB_REF && process.env.GITHUB_REF.split("/")[1] === "tags" ?
    extractVersion(process.env.GITHUB_REF.split("/")[2]) :
    `sha-${process.env.GITHUB_SHA}`;

  return `ghcr.io/socialgouv/${project}/${name}:${githubTag}`;
};
