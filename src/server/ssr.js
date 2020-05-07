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

  res.write(html);
  res.end();
};
