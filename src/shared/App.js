import React, { useState } from "react";
import { Layout } from "antd";
import moment from "moment";
import Search from "./components/Search";
import Info from "./components/Info";
import Map from "./components/Map";
import data from "../../data.json";

const { Header, Footer, Content } = Layout;

// ======== converting "data.json" to needed "weather" structure ========
const weather = {};

data.forEach(v => {
  const [date] = v.datetime.split(" ");
  if (weather[date]) weather[date].push(v);
  else weather[date] = [v];
});

const dateKeys = Object.keys(weather); // dates[]
const defaultDate = dateKeys[0]; // string
const defaultPlace = weather[defaultDate][0]; // {}
// ================

const App = () => {
  const [dates, setDate] = useState({ selected: defaultDate, all: dateKeys });

  const [places, setPlace] = useState({
    selected: defaultPlace,
    all: weather[defaultDate],
  });

  // when place changes => we select new place
  const onPlaceChange = place =>
    setPlace(prev => ({
      selected: prev.all.find(v => v.place_name === place),
      all: prev.all,
    }));

  // when date changes => we select new date, change places list to new weather[date] & select new place in the changed list
  const onDateChange = date => {
    const dateFormated = date.format("YYYY-MM-DD");
    setDate(prev => ({ selected: dateFormated, all: prev.all }));
    setPlace(prev => ({
      selected: weather[dateFormated].find(v => v.place_name === prev.selected.place_name),
      all: weather[dateFormated],
    }));
  };

  const selectedPlace = places.selected;
  const { longitude, latitude } = selectedPlace;
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ minHeight: "20%" }}>
        <Search
          places={places.all}
          dates={dates.all}
          onPlaceChange={onPlaceChange}
          onDateChange={onDateChange}
        />
      </Header>
      <Content style={{ minHeight: "20%" }}>
        <Info place={places.selected} date={dates.selected} />
      </Content>
      <Footer style={{ padding: 0, minHeight: "60%" }}>
        <Map lng={longitude} ltd={latitude} />
      </Footer>
    </Layout>
  );
};

export default App;
