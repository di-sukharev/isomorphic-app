import React, { useState } from "react";
import moment from "moment";
import { AutoComplete, DatePicker, Row, Col, Typography } from "antd";

const { Text } = Typography;

// todo: pass weather instead of places and dates, incapsulate division of weather
const Search = ({ weather, onPlaceChange, onDateChange }) => {
  const dates = Object.keys(weather).sort(); // string[]

  const defaultDate = dates[0]; // string
  const defaultOptions = weather[defaultDate]; // {}[]

  // todo: options should be single value (current), rest info is passed in props
  const [options, setOptions] = useState(defaultOptions);
  // controlled autocomplete input value
  const [place, setPlace] = useState();
  const [date, setDate] = useState({
    value: moment(defaultDate),
    formatted: moment(defaultDate).format("YYYY-MM-DD"),
  });

  // autocomplete dynamic filtering on input
  const onSearch = v => {
    setPlace(v);
    setOptions(
      weather[date.formatted].filter(
        p => p.place_name && p.place_name.toLowerCase().includes(v.toLowerCase())
      )
    );
  };

  const onSelect = v => {
    // set value
    setPlace(v);

    // update options
    setOptions(
      weather[date.formatted].filter(
        p => p.place_name && p.place_name.toLowerCase().includes(v.toLowerCase())
      )
    );

    // send selected place
    const selected = weather[date.formatted].find(p => p.place_name === v) || null;
    onPlaceChange(selected);
  };

  const onChange = val => {
    const dateFormatted = val.format("YYYY-MM-DD");
    setDate({ value: val, formatted: dateFormatted });
    // if date changes, change list of possible autocomplete options
    const newPlaces = weather[dateFormatted];
    // apply previous search (filter)
    setOptions(
      newPlaces.filter(v => v.value && v.value.toLowerCase().includes(place && place.toLowerCase()))
    );
    // change place according to selected date
    // if there is no previosly selected place in the new list of options, clear previously selected place
    const newPlaceInChangedDate = weather[dateFormatted].find(
      plc => place && place.toLowerCase() === plc.place_name.toLowerCase()
    );
    if (newPlaceInChangedDate) onPlaceChange(newPlaceInChangedDate);
    else onPlaceChange(undefined); // clear with undefined

    // send changes to the parent (up)
    onDateChange(dateFormatted);
  };

  // disable non-existing in "data.json" dates in <DatePicker/>
  const disabledDate = current =>
    current &&
    (current < moment(dates[0], "YYYY-MM-DD") ||
      current > moment(dates[dates.length - 1], "YYYY-MM-DD"));

  return (
    <Row style={{ height: "100%" }} align="middle" justify="center">
      <Col md={4}>
        <Text style={{ color: "white", fontSize: 50 }}>Weather</Text>
      </Col>
      <Col md={8} offset={2}>
        <AutoComplete
          value={place}
          style={{
            width: "100%",
          }}
          options={options.map(v => ({ value: v.place_name }))}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="Enter your city"
        />
      </Col>
      <Col md={4} offset={1}>
        <DatePicker
          value={date.value}
          allowClear={false}
          disabledDate={disabledDate}
          defaultValue={moment(dates[0], "YYYY-MM-DD")}
          onChange={onChange}
          placeholder="Enter date"
        />
      </Col>
    </Row>
  );
};

export default Search;
