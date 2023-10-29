const plugin = require('tailwindcss/plugin');

function generateComponents(prefix, colors) {
  return Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] === 'string') {
      return {
        ...acc,
        [`${prefix}-${key}`]: {
          borderWidth: '1px',
          borderColor: colors[key],
          color: colors[key],
          '&:disabled': {
            borderColor: '#d1d5db',
            color: '#d1d5db',
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
  const outlined = generateComponents('.outlined', colors);
  addComponents(outlined);
});
