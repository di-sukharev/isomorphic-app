require("@babel/register")({
  ignore: [/\.css$/, /\/(build|node_modules)\//],
});

require("./src/server/index.js");
