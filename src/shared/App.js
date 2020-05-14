import React, { useState } from "react";
import { Layout } from "antd";
import Search from "./components/Search";
import Info from "./components/Info";
import Map from "./components/Map";
import WEATHER, { DEFAULT_DATE, DEFAULT_PLACE } from "../data";

const { Header, Footer, Content } = Layout;

const App = () => {
  // set date state
  const [date, setDate] = useState(DEFAULT_DATE);
  // set place state
  const [place, setPlace] = useState(DEFAULT_PLACE);

  const { longitude = 0, latitude = 0 } = place || {};

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ minHeight: "20%" }}>
        <Search weather={WEATHER} onPlaceChange={setPlace} onDateChange={setDate} />
      </Header>
      <Content style={{ minHeight: "20%" }}>
        <Info place={place} date={date} />
      </Content>
      <Footer style={{ padding: 0, minHeight: "60%" }}>
        <Map lng={longitude} ltd={latitude} />
      </Footer>
    </Layout>
  );
};

export default App;
