module.exports = {
  modules: [
    'babel',
    'istanbul',
    'mocha'
  ],

  dirs: {
    src: 'lib',
    test: 'obj/test'
  },

  babel: {
    options: {
      stage: 1
    }
  }
};