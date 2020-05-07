import React from "react";
import { Row, Col, Typography } from "antd";

const { Text } = Typography;

const Info = ({ place }) => {
  const { precipitation_probability: pp } = place;

  let weather;

  if (pp < 25) weather = ` ☀️ — ${pp}%`;
  else if (pp < 50) weather = ` ⛅ — ${pp}%`;
  else if (pp < 75) weather = ` ☁️ — ${pp}%`;
  else if (pp < 100) weather = ` 🌧️ — ${pp}%`;

  return (
    <Row style={{ height: "100%", padding: 20 }} align="middle" justify="center">
      <Col md={10}>
        <Text style={{ fontSize: 30 }}>{place.place_name}</Text>
        <Text style={{ fontSize: 50 }}>{weather}</Text>
      </Col>
      <Col md={8}>
        <div
          style={{
            backgroundImage: "linear-gradient(to right, #aad4e5, #f06d06)",
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "white" }} strong>
            min temp: {place.temperature_min}˚
          </Text>
          <Text style={{ color: "white" }} strong>
            max temp: {place.temperature_max}˚
          </Text>
        </div>
      </Col>
    </Row>
  );
};

export default Info;
