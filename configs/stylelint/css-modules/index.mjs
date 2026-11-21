// CSS Modules のための規則
export default {
  rules: {
    // クラスの名前は、キャメルケースで書く（TypeScript から styles.errorMessage のように読めるようにする）
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      { message: 'クラスの名前は、キャメルケースで書く（例: errorMessage）' },
    ],
    // CSS Modules の書き方（:global、:local）を許す
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    // CSS Modules の書き方（composes）を許す
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
  },
};
