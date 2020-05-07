import React, { useState } from "react";
import moment from "moment";
import { AutoComplete, DatePicker, Row, Col, Typography } from "antd";

const { Text } = Typography;

const Search = ({ places, dates, onPlaceChange, onDateChange }) => {
  const names = places.map(place => ({
    value: place.place_name,
  }));

  const [options, setOptions] = useState(names);

  // autocomplete dynamic filtering
  const onSearch = v =>
    setOptions(
      names.filter(name => name.value && name.value.toLowerCase().includes(v.toLowerCase()))
    );

  // disable inappropriate dates in <DatePicker/>
  const disabledDate = current =>
    current &&
    (current < moment(dates[0], "YYYY-MM-DD") ||
      current > moment(dates[dates.length - 1], "YYYY-MM-DD"));

  return (
    <Row style={{ height: "100%" }} align="middle" justify="center">
      <Col span={4}>
        <Text style={{ color: "white", fontSize: 50 }}>Weather</Text>
      </Col>
      <Col span={8} offset={2}>
        <AutoComplete
          style={{
            width: "100%",
          }}
          // autoFocus
          // defaultValue={options[0] && options[0].value}
          options={options}
          onSelect={onPlaceChange}
          onSearch={onSearch}
          placeholder="What is your place?"
        />
      </Col>
      <Col span={4} offset={1}>
        <DatePicker
          disabledDate={disabledDate}
          defaultValue={moment(dates[0], "YYYY-MM-DD")}
          onChange={onDateChange}
        />
      </Col>
    </Row>
  );
};

export default Search;
