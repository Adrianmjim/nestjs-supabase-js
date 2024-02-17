const getJestProjectConfig = require('./getJestProjectConfig');
const getTestMatch = require('./getTestMatch');

/**
 * @param { !string } projectName Jest project's name
 * @param { !Array<string> } testPathIgnorePatterns Expressions to match to ignored file paths by jest
 * @param { ?string } extension Test extension to match
 * @returns { !import("jest").Config } Jest config
 */
function getJestJsProjectConfig(projectName, testPathIgnorePatterns, extension) {
  const testMatch = [getTestMatch(extension, false)];

  return getJestProjectConfig(projectName, testMatch, testPathIgnorePatterns);
}

module.exports = getJestJsProjectConfig;