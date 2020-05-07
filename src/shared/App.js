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
  const { lng, ltd } = selectedPlace;

  return (
    <Layout>
      <Header>
        <Search
          places={places.all}
          dates={dates.all}
          onPlaceChange={onPlaceChange}
          onDateChange={onDateChange}
        />
      </Header>
      <Content>
        <Info place={places.selected} date={dates.selected} />
      </Content>
      <Footer>
        <Map lng={lng} ltd={ltd} />
      </Footer>
    </Layout>
  );
};

export default App;
