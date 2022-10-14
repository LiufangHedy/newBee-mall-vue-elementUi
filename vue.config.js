const { defineConfig } = require("@vue/cli-service");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: true,
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      let optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[/]node_modules[/]/,
              name(module) {
                const packageName = module.context.includes("node_modules")
                  ? module.context.match(/\/node_modules\/(.*?)(\/|$)/)[1]
                  : module.context.split("/")[-1];
                // console.log("packageName: ", packageName, module.context);
                return `npm/${packageName}`;
              },
            },
          },
        },
      };
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[/]node_modules[/]/,
            name(module) {
              const packageName = module.context.includes("node_modules")
                ? module.context.match(/\/node_modules\/(.*?)(\/|$)/)[1]
                : module.context.split("/")[-1];
              // console.log("packageName: ", packageName, module.context);
              return `npm/${packageName}`;
            },
          },
        },
      };
      config["plugins"].push(
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
        })
      );
      console.log("configgggggggg：", config);
      console.log(optimization);
      // Object.assign(config, { optimization });
    }
  },
});
