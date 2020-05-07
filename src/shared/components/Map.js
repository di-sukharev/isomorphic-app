import React from "react";

const Map = ({ lng, ltd }) => (
  <iframe
    frameBorder="0"
    border="0"
    cellSpacing="0"
    style={{ width: "100%", height: "100%" }}
    title="map"
    src={`https://maps.darksky.net/@temperature,${ltd},${lng},6?marker=${ltd},${lng}&amp;linkto=maps`}
  />
);

export default Map;
