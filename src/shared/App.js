import React, { useState } from "react";
import { Layout } from "antd";
import Search from "./components/Search";
import Info from "./components/Info";
import Map from "./components/Map";
import data from "../../data.json";

const { Header, Footer, Content } = Layout;

// todo: move this fabric to /tools/weatherFabric.js
// ======== converting "data.json" to needed "weather" structure ========
const weather = {};

data.forEach(v => {
  const [date] = v.datetime.split(" ");
  if (weather[date]) weather[date].push(v);
  else weather[date] = [v];
});

// ================

const App = () => {
  const dates = Object.keys(weather).sort(); // string[]
  const defaultDate = dates[0]; // string
  const defaultPlace = weather[defaultDate][0]; // {}

  // set date state
  const [date, setDate] = useState(defaultDate);
  // set place state
  const [place, setPlace] = useState(defaultPlace);

  const { longitude = 0, latitude = 0 } = place || {};

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ minHeight: "20%" }}>
        <Search weather={weather} onPlaceChange={setPlace} onDateChange={setDate} />
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
