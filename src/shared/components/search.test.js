/* eslint-disable camelcase */
import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Search from "./Search";

import PLACES from "./__mocks__/places";
import DATES from "./__mocks__/date";

const shallow = new ShallowRenderer();

describe("Info tests", () => {
  it("renders correctly", () => {
    shallow.render(
      <Search places={PLACES} dates={DATES} onPlaceChange={() => {}} onDateChange={() => {}} />
    );
    expect(shallow.getRenderOutput()).toMatchSnapshot();
  });
});
