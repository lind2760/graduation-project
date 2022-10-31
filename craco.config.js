const CracoLessPlugin = require("craco-less");
const path = require("path");
const WebpackBar = require("webpackbar"); // 进度条

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    plugins: [new WebpackBar({ profile: true })],
  },
  presets: ["react-app"],
  plugins: [
    {
      plugin: CracoLessPlugin, // less配置问题
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#5396E9",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: "css",
        },
      ],
    ],
  },
};
