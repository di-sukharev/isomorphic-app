/* eslint-disable camelcase */
import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import Search from "./Search";
import WEATHER from "../../data";

describe("Integration tests of <AutoComplete/> and <DatePicker/> in <Search/> together", () => {
  let FAKE_WEATHER = null;

  beforeEach(() => {
    FAKE_WEATHER = WEATHER;
  });

  afterEach(cleanup);

  it("When date changed it changes place as well", async () => {
    const onPlaceChange = jest.fn();
    const onDateChange = jest.fn();
    const { getByText, getByRole, getByPlaceholderText, getByTitle } = render(
      <Search weather={FAKE_WEATHER} onPlaceChange={onPlaceChange} onDateChange={onDateChange} />
    );

    const selectPlace = async place => {
      fireEvent.mouseDown(getByRole(/combobox/i)); // open popup
      fireEvent.change(getByRole(/combobox/i), { target: { value: place } });
      let option = null;
      await waitFor(() => {
        option = getByText(place, {
          ignore: "[role=option]",
        });
      });

      fireEvent.click(option);
    };

    const selectDate = async date => {
      const DatePicker = getByPlaceholderText(/Enter date/i);
      fireEvent.mouseDown(DatePicker); // open popup

      let option = null;
      await waitFor(() => {
        option = getByTitle(date);
      });

      fireEvent.click(option);
    };

    const DATE_2014_08_09 = "2014-08-09";
    const DATE_2014_08_10 = "2014-08-10";
    const DATE_2014_08_12 = "2014-08-12";
    const Maastricht = "Maastricht";
    const Amsterdam = "Amsterdam";

    await selectDate(DATE_2014_08_09);
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onPlaceChange).toHaveBeenCalledTimes(1);
    expect(onPlaceChange).toHaveBeenCalledWith(undefined);
    await selectPlace(Maastricht);
    expect(onPlaceChange).toHaveBeenCalledWith(
      FAKE_WEATHER[DATE_2014_08_09].find(p => p.place_name === Maastricht)
    );
    expect(onPlaceChange).toHaveBeenCalledTimes(2);
    await selectDate(DATE_2014_08_12);
    expect(onDateChange).toHaveBeenCalledTimes(2);
    expect(onDateChange).toHaveBeenCalledWith(DATE_2014_08_12);
    expect(onPlaceChange).toHaveBeenCalledWith(
      FAKE_WEATHER[DATE_2014_08_12].find(p => p.place_name === Maastricht)
    );
    expect(onPlaceChange).toHaveBeenCalledTimes(3);
    await selectPlace(Amsterdam);
    expect(onPlaceChange).toHaveBeenCalledWith(
      FAKE_WEATHER[DATE_2014_08_12].find(p => p.place_name === Amsterdam)
    );
    expect(onPlaceChange).toHaveBeenCalledTimes(4);
    await selectDate(DATE_2014_08_10);
    expect(onDateChange).toHaveBeenCalledTimes(3);
    expect(onDateChange).toHaveBeenCalledWith(DATE_2014_08_10);
    expect(onPlaceChange).toHaveBeenCalledWith(
      FAKE_WEATHER[DATE_2014_08_10].find(p => p.place_name === Amsterdam)
    );
    expect(onPlaceChange).toHaveBeenCalledTimes(5);
  });
});
