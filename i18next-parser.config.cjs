module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  options: {
    debug: false,
    removeUnusedKeys: true,
    func: {
      list: ['t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    lngs: ['en', 'id'],
    defaultLng: 'en',
    defaultNs: 'translation',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
    },
  },
};
