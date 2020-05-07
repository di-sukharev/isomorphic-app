import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../shared/App.js";
import Document from "./document.js";

export default (req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <Document>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Document>
  );

  /*
  It can just be:
    res.write(html);
    res.end();
  */
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.write(html);
    res.end();
  }
};
