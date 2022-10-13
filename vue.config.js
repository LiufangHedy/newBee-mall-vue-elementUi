const { defineConfig } = require("@vue/cli-service");
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
                console.log("packageName: ", packageName, module.context);
                return `npm/${packageName}`;
              },
            },
          },
        },
      };
      Object.assign(config, { optimization });
    }
  },
});
