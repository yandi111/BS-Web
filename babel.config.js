const prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  prodPlugins.push("transform-remove-console");
}
module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    ["@babel/preset-env", { modules: false }],
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
    ...prodPlugins,
  ],
};
