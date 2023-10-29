const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents, theme }) {
  const spacing = theme('spacing');
  const wh = Object.keys(spacing).reduce(
    (acc, key) => ({
      ...acc,
      [`.wh-${key}`]: {
        width: spacing[key],
        height: spacing[key],
      },
    }),
    {}
  );
  addComponents(wh);
});
