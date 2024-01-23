const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const {FederatedTypesPlugin } = require('@module-federation/typescript');
const path = require("path");

const deps = require("./package.json").dependencies;

const federationConfig = {
  name: "nav",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./Header": "./src/Header",
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};


module.exports = {
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  infrastructureLogging: {
    level: 'log',
  },



  devServer: {
    static: {
      // expose the dist folder to the dev server which contains `__types_index.json` file with the types of the exposed modules
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin(federationConfig),
    new FederatedTypesPlugin({federationConfig}), // Plugin to generate types of the exposed modules
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
