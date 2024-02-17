const getJestJsProjectConfig = require('./getJestJsProjectConfig');
const getJestTsProjectConfig = require('./getJestTsProjectConfig');

const jsUnitProject = getJestJsProjectConfig(
  'Unit',
  ['.int.spec.js'],
  '.spec.js',
);

const jsIntegrationProject = getJestJsProjectConfig(
  'Integration',
  [],
  '.int.spec.js',
);

/** @type {!import("@jest/types").Config.InitialOptions} */
const jsGlobalConfig = {
  passWithNoTests: true,
  projects: [jsIntegrationProject, jsUnitProject],
};

const tsUnitProject = getJestTsProjectConfig(
  'Unit',
  ['.int.spec.ts'],
  '.spec.ts',
);

const tsIntegrationProject = getJestTsProjectConfig(
  'Integration',
  [],
  '.int.spec.ts',
);

/** @type {!import("@jest/types").Config.InitialOptions} */
const tsGlobalConfig = {
  passWithNoTests: true,
  projects: [tsIntegrationProject, tsUnitProject],
};

module.exports = {
  getJestJsProjectConfig,
  getJestTsProjectConfig,
  jsGlobalConfig,
  tsGlobalConfig,
};
