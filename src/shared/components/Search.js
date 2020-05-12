import React, { useState } from "react";
import moment from "moment";
import { AutoComplete, DatePicker, Row, Col, Typography } from "antd";

const { Text } = Typography;

const Search = ({ places, dates, onPlaceChange, onDateChange }) => {
  const names = places.all[dates.selected].map(place => ({
    value: place.place_name,
  }));

  const [options, setOptions] = useState(names);

  // autocomplete dynamic filtering
  const onSearch = v =>
    setOptions(
      names.filter(name => name.value && name.value.toLowerCase().includes(v.toLowerCase()))
    );

  // disable non-existing in "data.json" dates in <DatePicker/>
  const disabledDate = current =>
    current &&
    (current < moment(dates.all[0], "YYYY-MM-DD") ||
      current > moment(dates.all[dates.all.length - 1], "YYYY-MM-DD"));

  return (
    <Row style={{ height: "100%" }} align="middle" justify="center">
      <Col md={4}>
        <Text style={{ color: "white", fontSize: 50 }}>Weather</Text>
      </Col>
      <Col md={8} offset={2}>
        <AutoComplete
          style={{
            width: "100%",
          }}
          options={options}
          onSelect={onPlaceChange}
          onSearch={onSearch}
          placeholder="Enter your city"
        />
      </Col>
      <Col md={4} offset={1}>
        <DatePicker
          disabledDate={disabledDate}
          defaultValue={moment(dates.all[0], "YYYY-MM-DD")}
          onChange={onDateChange}
          placeholder="Enter date"
        />
      </Col>
    </Row>
  );
};

export default Search;
