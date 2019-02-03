const path = require("path");
const webpack = require("webpack");

const basePlugins = [
  new webpack.LoaderOptionsPlugin({
    tsConfigPath: path.resolve(__dirname, "src/tsconfig.json"),
  }),
];

module.exports = function(env) {
  const plugins = [
    ...basePlugins,
  ];
  return {
    entry: {
      main: path.resolve(__dirname, "src/app.tsx"),
    },
    output: {
      path: path.resolve(__dirname, "../../dist/public"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, exclude: /node_modules/, loader: "light-ts-loader" },
        // {
        //   test: /\.css$/,
        //   use: ExtractTextPlugin.extract([
        //     {
        //       loader: "css-loader",
        //       options: {
        //         modules:true,
        //         localIdentName: env !== "prod" ? "[name]_[local]" : "[hash:base64]"
        //       },
        //     },
        //     "postcss-loader"
        //   ]),
        // },
      ],
    },
    plugins,
    devServer: {
      port: 4000,
      contentBase: path.join(__dirname, "public"),
    },
    devtool: "source-map",
  };
};
