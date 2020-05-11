/* eslint-disable camelcase */
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom/extend-expect";

import PLACES from "./__mocks__/places";
import DATES from "./__mocks__/date";

describe("Snapshots", () => {
  it("Renders correctly", () => {
    const component = renderer.create(
      <Search places={PLACES} dates={DATES} onPlaceChange={() => {}} onDateChange={() => {}} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Changes autocomplete options on input", async () => {
    const { getByRole, getAllByText } = render(
      <Search places={PLACES} dates={DATES} onPlaceChange={() => {}} onDateChange={() => {}} />
    );

    const query = "Am"; // "Am" matches -> Amsterdam, Rotterdam, ...
    const filteredPlaces = PLACES.filter(place =>
      place.place_name.toLowerCase().includes(query.toLowerCase())
    );

    fireEvent.focus(getByRole("combobox")); // simulate focus event on input
    fireEvent.change(getByRole("combobox"), { target: { value: query } }); // simulate change event on input — value: Utrecht
    const renderedPlaces = await waitFor(() =>
      getAllByText(query, {
        exact: false,
        selector: ".ant-select-item-option-content",
      })
    ); // take rendered renderedPlaces — ant-select-item-option-content

    expect(renderedPlaces.length).toEqual(filteredPlaces.length);

    // filteredPlaces equals to renderedPlaces
    for (let i = 0; i < filteredPlaces.length; i++) {
      expect(renderedPlaces[i]).toHaveTextContent(filteredPlaces[i].place_name);
    }
  });
});
