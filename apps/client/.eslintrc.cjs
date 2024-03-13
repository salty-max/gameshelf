module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
   "custom",
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh', "tailwindcss"],
  settings: {
    tailwindcss: {
      "callees": ["cn", "cva"],
      "config": "tailwind.config.js"
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
