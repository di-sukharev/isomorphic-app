import React from "react";
import { Row, Col } from "antd";

const Map = ({ lng, ltd }) => (
  <Row style={{ height: "100%", background: "white" }} align="middle" justify="center">
    <Col span={24}>
      <iframe
        style={{ width: "100%" }}
        title="map"
        src={`https://maps.darksky.net/@temperature,${ltd},${lng},6?marker=${ltd},${lng}&amp;linkto=maps`}
      />
    </Col>
  </Row>
);

export default Map;
