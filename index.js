require("@babel/register")({
  ignore: [/\.css$/, /\/(build|node_modules)\//],
});

require.extensions[".css"] = () => {};

require("./src/server/index.js");
