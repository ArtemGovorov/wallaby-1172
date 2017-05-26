module.exports = wallaby => {

  // Babel, jest-cli and some other modules are located under
  // react-scripts/node_modules, so need to let node.js know about it
  var path = require('path');
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules');
  require('module').Module._initPaths();

  // Babel needs this
  process.env.NODE_ENV = 'development';

  return {
    files: [
      'src/**/*.js',
      '!src/**/*.test.js'
    ],

    tests: ['src/**/*.test.js', 'src/**/*.spec.js'],

    env: {
      type: 'node',
      runner: 'node'
    },
    reportConsoleErrorAsError: true,
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: [
          'env',
          'react',
          'stage-0'
        ]
      })
    },

    setup: wallaby => {
      wallaby.testFramework.configure({
        // as in node_modules/react-scripts/utils/createJestConfig.js
        moduleNameMapper: {
          'keycloak': '<rootDir>/node_modules/keycloak-js/dist/keycloak.js',
          '\\.(styl)$': '<rootDir>/node_modules/jest-css-modules',
          'source(.*)$': '<rootDir>/csfWidgets/source$1'
        }
      });
    },

    testFramework: 'jest'
  };
};