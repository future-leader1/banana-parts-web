const plugin = require('tailwindcss/plugin');

function generateComponents(prefix, colors) {
  return Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] === 'string') {
      return {
        ...acc,
        [`${prefix}-${key}`]: {
          backgroundColor: colors[key],
          color: 'white',
          '&:disabled': {
            backgroundColor: '#d1d5db',
          },
        },
      };
    }
    return {
      ...acc,
      ...generateComponents(`${prefix}-${key}`, colors[key]),
    };
  }, {});
}

module.exports = plugin(function ({ addComponents, theme }) {
  const colors = theme('colors');
  const filled = generateComponents('.filled', colors);
  addComponents(filled);
});
