// .prettierr.js
module.exports = {
  tabWidth: 2, // tab缩进大小,默认为2
  useTabs: false, //是否使用tab来缩进
  printWidth: 120, //一行代码的最大字符数
  semi: true, // 结尾是否添加分号
  singleQuote: true, // 使用单引号
  arrowParens: "avoid", //箭头函数单个参数的情况是否省略括号 always带括号
  trailingComma: "all", // 尾随逗号
  bracketSpacing: true, // 对象中打印空格
  jsxSingleQuote: true, //// 尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
  jsxBracketSameLine: false, // 在jsx中把'>' 放同一行
  ignorePath: ".prettierignore",
};
