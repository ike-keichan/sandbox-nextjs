import eslintPluginStorybook from 'eslint-plugin-storybook';

// Storybook の見本の書き方の規則。見本のファイルにだけ適用される
/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [...eslintPluginStorybook.configs['flat/recommended']];
