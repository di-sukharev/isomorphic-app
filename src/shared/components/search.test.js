/* eslint-disable camelcase */
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import Search from "./Search";

import data from "../../../data.json";

// ======== converting "data.json" to needed "weather" structure ========
const weather = {};

data.forEach(v => {
  const [date] = v.datetime.split(" ");
  if (weather[date]) weather[date].push(v);
  else weather[date] = [v];
});

const dateKeys = Object.keys(weather); // string[]
const defaultDate = dateKeys[0]; // string
const defaultPlace = weather[defaultDate][0]; // {}
// ================

const FAKE_DATES = { selected: defaultDate, all: dateKeys };
const FAKE_PLACES = { selected: defaultPlace, all: weather };

describe("Kind of integration (not really) test of <AutoComplete/> and <DatePicker/> in <Search/> together", () => {
  afterEach(cleanup);

  it("takes callbacks and calls them with values when selected", async () => {
    let placeChangeCalledTimes = 0;
    let dateChangeCalledTimes = 0;
    const onPlaceChange = jest.fn();
    const onDateChange = jest.fn();
    const { getByText, getByRole, getByPlaceholderText, getByTitle } = render(
      <Search
        places={FAKE_PLACES}
        dates={FAKE_DATES}
        onPlaceChange={onPlaceChange}
        onDateChange={onDateChange}
      />
    );

    const testPlace = async place => {
      fireEvent.change(getByRole(/combobox/i), { target: { value: place } });
      let option = null;
      await waitFor(() => {
        option = getByText(place, {
          ignore: "[role=option]",
        });
      });

      fireEvent.click(option);
      expect(onPlaceChange).toHaveBeenCalledWith(place, { value: place });
      expect(onPlaceChange).toHaveBeenCalledTimes(++placeChangeCalledTimes);
    };

    const testDate = async date => {
      fireEvent.click(getByPlaceholderText(/Enter date/i));

      let option = null;
      await waitFor(() => {
        option = getByTitle(date);
      });

      fireEvent.click(option); // todo: CLICK DOESN'T WORK
      expect(onDateChange).toHaveBeenCalledWith(date, { value: date });
      expect(onDateChange).toHaveBeenCalledTimes(++dateChangeCalledTimes);
    };

    // testing autocomplete
    await testPlace("Maastricht");
    await testPlace("Amsterdam");
    await testPlace("Enschede");

    // testing date picker
    await testDate("2014-08-08");
    await testDate("2014-08-10");
    await testDate("2014-08-11");
    await testDate("2014-08-12");
  });
});
