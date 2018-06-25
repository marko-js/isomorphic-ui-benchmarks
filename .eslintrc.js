// module.exports = require('@hbc/haru-configs/eslint.conf')

// NOTE: Default configuration can be extended
module.exports = require('@hbc/haru-configs/eslint.conf').custom({
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'semi': ['error', 'never']
  }
});
