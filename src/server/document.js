import React from "react";

const Document = ({ children }) => (
  <html lang="en">
    <head>
      <title>Isomorphic Weather Forecast</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.compact.min.css"
        // href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.dark.min.css"
      />
    </head>
    <body>
      <div id="root">{children}</div>
      <script type="application/javascript" src="/main.bundle.js" />
    </body>
  </html>
);

export default Document;
