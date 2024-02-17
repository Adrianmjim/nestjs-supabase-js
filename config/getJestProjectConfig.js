const projectRoot = require('./projectRoot');

/**
 * @param { !string } projectName Jest project's name
 * @param { !Array<string> } testMatch Expressions to match to test file paths
 * @param { !Array<string> } testPathIgnorePatterns Expressions to match to ignored file paths by jest
 * @returns { !import("@jest/types").Config.InitialProjectOptions } Jest config
 */
function getJestProjectConfig(projectName, testMatch, testPathIgnorePatterns) {
  /** @type { !import("@jest/types").Config.InitialProjectOptions } */
  const projectConfig = {
    displayName: projectName,
    coveragePathIgnorePatterns: ['/fixtures/', '/node_modules/'],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    rootDir: '.',
    roots: [projectRoot],
    testEnvironment: 'node',
    testMatch: testMatch,
    testPathIgnorePatterns: testPathIgnorePatterns,
  };

  return projectConfig;
}

module.exports = getJestProjectConfig;