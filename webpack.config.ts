import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const BUILD_ENV: string = process.env.BUILD_ENV || "LOCAL";
const LOCAL_PORT: string | number = process.env.LOCAL_PORT || 3000;
const SERVE_LOCAL: boolean =
  process.env.WEBPACK_SERVE !== undefined &&
  process.env.WEBPACK_SERVE.toUpperCase() === "TRUE";

/**
 * Config for running local development server
 */
const getDevServerConfig = (): WebpackDevServerConfiguration => {
  const devServerConfig: WebpackDevServerConfiguration = {
    static: path.join(__dirname, "build"),
    allowedHosts: ["all"],
    compress: true,
    port: LOCAL_PORT,
    hot: true,
    historyApiFallback: true,
  };

  console.log("Starting Development server with the following configuration:");
  console.log(devServerConfig);

  return devServerConfig;
};

console.info(`Building application for environment ${BUILD_ENV}`);

const baseConfig: Configuration = {
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  output: {
    publicPath: "/",
    filename: "[name].js",
    path: path.join(__dirname, "build/"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      chunks: ["app"],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },

  target: "web",

  performance: {
    maxEntrypointSize: 5242880,
    maxAssetSize: 5242880
  }
};

if (!baseConfig.plugins) throw new Error("No plugins array!");

switch (BUILD_ENV) {
  case "LOCAL":
    baseConfig.devtool = "source-map";
    baseConfig.mode = "development";
    baseConfig.plugins.push(
      new Dotenv({
        safe: true,
        allowEmptyValues: false,
        path: "./env/local.env", // load this now instead of the ones in '.env'
      })
    );

    if (SERVE_LOCAL) baseConfig.devServer = getDevServerConfig();

    break;

  case "DEV":
    baseConfig.devtool = "source-map";
    baseConfig.mode = "development";
    baseConfig.plugins.push(
      new Dotenv({
        path: "./env/development.env", // load this now instead of the ones in '.env'
      })
    );

    if (SERVE_LOCAL) baseConfig.devServer = getDevServerConfig();

    break;

  case "PROD":
    baseConfig.plugins.push(
      new Dotenv({
        path: "./env/production.env", // load this now instead of the ones in '.env'
      })
    );

    baseConfig.mode = "production";
    if (SERVE_LOCAL) baseConfig.devServer = getDevServerConfig();

    break;
}

export default baseConfig;
