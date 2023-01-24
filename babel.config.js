module.exports = {
  presets: [
    'module:metro-react-native-babel-preset'
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          screens: './src/screens',
          navigation: './src/navigation',
          components: './src/components',
          services: './src/services',
          store: './src/store',
          i18n: './src/i18n',
          '@src': './src',
        },
        root: ['.'],
      },
    ],
  ],
};
