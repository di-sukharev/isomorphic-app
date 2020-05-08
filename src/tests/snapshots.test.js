import React from "react";
import renderer from "react-test-renderer";
import Info from "../shared/components/Info";

/* 
  change hardcoded mocks to jest.mock('./moduleName')
  https://jestjs.io/docs/en/manual-mocks
*/
const PLACE_MOCK = {
  station_id: 1438,
  place_name: "Amsterdam",
  latitude: 52.3,
  longitude: 4.766667,
  datetime: "2014-08-08 00:00:00",
  temperature_max: "24.2",
  temperature_min: "15.1",
  precipitation_probability: "90",
  precipitation_mm: "6.0",
};

const DATE_MOCK = "2014-08-08";

describe("Snapshots", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  test("Info renders correctly", () => {
    const component = renderer.create(<Info place={PLACE_MOCK} date={DATE_MOCK} />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
