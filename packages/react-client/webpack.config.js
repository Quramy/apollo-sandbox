const path = require("path");
const webpack = require("webpack");
const getTransformer = require('@quramy/ts-transform-graphql-tag').getTransformer

module.exports = function(env) {
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
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            getCustomTransformers: () => ({ before: [getTransformer()] }),
          },
        },
      ],
    },
    devServer: {
      port: 4000,
      contentBase: path.join(__dirname, "public"),
    },
    devtool: "source-map",
  };
};
