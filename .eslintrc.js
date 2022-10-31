// .eslintrc.js
module.exports = {
  extends: [
    "react-app", //  react帮配置好了一些语法，譬如箭头函数
    "airbnb",
    "plugin:prettier/recommended", // prettier配置
  ],
  plugins: ["simple-import-sort"],
  rules: {
    // not sure if this is a "bug" or "feature" in airBnB config? https://github.com/airbnb/javascript/issues/2505
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "arrow-function"],
      },
    ],
    // ESLint: 'React' was used before it was defined.(no-use-before-define) 解决react引入报错
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    // ESLint: JSX not allowed in files with extension '.tsx'(react/jsx-filename-extension)
    "react/jsx-filename-extension": [
      2,
      { extensions: ["js", "jsx", ".tsx", ".ts"] },
    ],
    // ESLint: Missing file extension "ts" for "@/service/config"(import/extensions) 解决扩展名问题
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-one-expression-per-line": "off", // 关闭要求一个表达式必须换行的要求，和Prettier冲突了
    // 'react/jsx-wrap-multilines': {
    //   "prop": "ignore", // 关闭要求jsx属性中写jsx必须要加括号，和Prettier冲突了
    // },
    "jsx-a11y/no-static-element-interactions": "off", // 关闭非交互元素加事件必须加 role
    "jsx-a11y/click-events-have-key-events": "off", // 关闭click事件要求有对应键盘事件
    "no-bitwise": "off", // 不让用位操作符，不知道为啥，先关掉
    "no-console": "off",
    "no-debugger": "off",
    "no-unused-vars": 0,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    globals: {
      NodeJS: true,
      JSX: true,
    },
    // @ant-design/icons缺少依赖项
    "import/core-modules": ["@ant-design/icons"],
  },
};
