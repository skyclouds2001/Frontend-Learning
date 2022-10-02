module.exports = {
  // 规定 ESLint 设定的根目录：常常是项目的根目录
  root: true,

  // 定义预定义的全局变量
  env: {
    // 浏览器环境中的全局变量
    browser: true,
    // Node.js 全局变量和 Node.js 作用域
    node: true,
    // CommonJS 全局变量和 CommonJS 作用域
    commonjs: true,
    // Node.js 和 Browser 通用全局变量
    'shared-node-browser': true,
    // 启用除了 modules 以外的所有 ECMAScript 6 特性
    es6: true,
  },

  // 使用第三方插件
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/standard',
  ],

  // 指定 JavaScript 语言选项
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    // 指定使用的 ECMAScript 版本
    ecmaVersion: 10,
    // 表示使用的额外的语言特性
    ecmaFeatures: {
      // 启用全局 strict mode
      impliedStrict: true,
      // 启用 JSX
      jsx: true,
    },
  },

  // 规定附带的规则
  rules: {


    // ** Possible Errors
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',


    // ** Best Practices


    // ** Strict Mode


    // ** Variables


    // ** Node.js and CommonJS


    // ** Stylistic Issues


    // 在数组开括号后和闭括号前强制换行 https://eslint.bootcss.com/docs/rules/array-bracket-newline
    'array-bracket-newline': [
      'error',
      'consistent',
    ],

    // 强制数组方括号中使用一致的空格 https://eslint.bootcss.com/docs/rules/array-bracket-spacing
    'array-bracket-spacing': [
      'error',
      'never',
      {
        'singleValue': true,
        'objectsInArrays': true,
        'arraysInArrays': true,
      },
    ],

    // 强制数组元素间出现换行 https://eslint.bootcss.com/docs/rules/array-element-newline
    'array-element-newline': [
      'error',
      'consistent',
    ],

    // 禁止或强制在代码块中开括号前和闭括号后有空格 https://eslint.bootcss.com/docs/rules/block-spacing
    'block-spacing': [
      'error',
      'always',
    ],

    // 强制在代码块中使用一致的大括号风格 https://eslint.bootcss.com/docs/rules/brace-style
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: false,
      },
    ],

    // 强制变量使用骆驼拼写法命名约定 https://eslint.bootcss.com/docs/rules/camelcase
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: false,
      },
    ],

    // 强制或禁止对注释的第一个字母大写 https://eslint.bootcss.com/docs/rules/capitalized-comments
    'capitalized-comments': [
      'error',
      'never',
    ],

    // 要求或禁止使用拖尾逗号 https://eslint.bootcss.com/docs/rules/comma-dangle
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],

    // 强制在逗号前后使用一致的空格 https://eslint.bootcss.com/docs/rules/comma-spacing
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],

    // 强制使用一致的逗号风格 https://eslint.bootcss.com/docs/rules/comma-style
    'comma-style': [
      'error',
      'last',
    ],

    // 强制在计算的属性的方括号中使用一致的空格 https://eslint.bootcss.com/docs/rules/computed-property-spacing
    'computed-property-spacing': [
      'error',
      'never',
    ],

    // 当获取当前执行环境的上下文this时，强制使用一致的命名 https://eslint.bootcss.com/docs/rules/consistent-this
    'consistent-this': [
      'error',
      'self',
    ],

    // 要求或禁止文件末尾存在空行 https://eslint.bootcss.com/docs/rules/eol-last
    'eol-last': [
      'error',
      'always',
    ],

    // 要求或禁止在函数标识符和其调用之间有空格 https://eslint.bootcss.com/docs/rules/func-call-spacing
    'func-call-spacing': [
      'error',
      'always',
      {
        'allowNewLines': false,
      },
    ],

    // 要求函数名与赋值给它们的变量名或属性名相匹配 https://eslint.bootcss.com/docs/rules/func-name-matching
    'func-name-matching': [
      'error',
      'never',
      {
        considerPropertyDescriptor: true,
        includeCommonJSModuleExports: true,
      },
    ],

    // 要求或禁止使用命名的 function 表达式 https://eslint.bootcss.com/docs/rules/func-names
    'func-names': [
      'error',
      'as-needed',
      {
        'generators': 'as-needed',
      },
    ],

    // 强制一致地使用 function 声明或表达式 https://eslint.bootcss.com/docs/rules/func-style
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],

    // 强制在函数括号内使用一致的换行 https://eslint.bootcss.com/docs/rules/function-paren-newline
    'function-paren-newline': [
      'error',
      'consistent',
    ],

    // 禁用指定的标识符 https://eslint.bootcss.com/docs/rules/id-blacklist
    'id-blacklist': [
      'error',
      'cb',
      'err',
      'data',
    ],

    // 强制标识符的最小和最大长度 https://eslint.bootcss.com/docs/rules/id-length
    'id-length': [
      'error',
      {
        min: 1,
        max: 25,
      },
    ],

    // 要求标识符匹配一个指定的正则表达式 https://eslint.bootcss.com/docs/rules/id-match
    'id-match': [
      'error',
      '^[a-z]+([A-Z][a-z]+)*$',
    ],

    // 强制隐式返回的箭头函数体的位置 https://eslint.bootcss.com/docs/rules/implicit-arrow-linebreak
    'implicit-arrow-linebreak': [
      'error',
      'beside',
    ],

    // 强制使用一致的缩进 https://eslint.bootcss.com/docs/rules/indent
    indent: [
      'error',
      2,
    ],

    // todo TODO
    // 强制在对象字面量的属性中键和值之间使用一致的间距 https://eslint.bootcss.com/docs/rules/key-spacing
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],

    // 强制在关键字前后使用一致的空格 https://eslint.bootcss.com/docs/rules/keyword-spacing
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],

    // 强制使用一致的换行符风格 https://eslint.bootcss.com/docs/rules/linebreak-style
    'linebreak-style': [
      'error',
      'unix',
    ],

    // 不允许多个空行 https://eslint.bootcss.com/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 1,
      },
    ],

    // 禁用行尾空格 https://eslint.bootcss.com/docs/rules/no-trailing-spaces
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],

    // 强制操作符使用一致的换行符风格 https://eslint.bootcss.com/docs/rules/operator-linebreak
    'operator-linebreak': [
      'error',
      'after',
    ],

    // 强制使用一致的反勾号、双引号或单引号 https://eslint.bootcss.com/docs/rules/quotes
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],

    // 要求或禁止使用分号代替 ASI（自动分号插入）https://eslint.bootcss.com/docs/rules/semi
    semi: [
      'error',
      'always',
    ],

    // 强制在 function的左括号之前使用一致的空格 https://eslint.bootcss.com/docs/rules/space-before-function-paren
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always',
      },
    ],

    // 强制在注释中 // 或 /* 使用一致的空格 https://eslint.bootcss.com/docs/rules/spaced-comment
    'spaced-comment': [
      'error',
      'always',
    ],


    // ** ECMAScript 6


    // ** vue-eslint

    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'Home',
          'User',
        ],
      }],

  },
};
