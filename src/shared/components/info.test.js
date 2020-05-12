import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import Info from "./Info";

// todo: take FAKES from /tools/weatherFabric.js
import FAKE_PLACES from "./__mocks__/places";
import FAKE_DATES from "./__mocks__/dates";

describe("Unit test of <Info/> component", () => {
  it("renders place name and date", () => {
    const { getByText } = render(<Info place={FAKE_PLACES[0]} date={FAKE_DATES[0]} />);
    expect(getByText(FAKE_PLACES[0].place_name)).toBeInTheDocument();
    expect(getByText(FAKE_DATES[0])).toBeInTheDocument();
  });
});
