import js from '@/js'
import globals from 'globals'
import reactHooks from '-plugin-react-hooks'
import reactRefresh from '-plugin-react-refresh'
import ts from 'typescript-'

export default ts.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...ts.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
