import React from "react";
import renderer from "react-test-renderer";
import Info from "./Info";

import PLACES from "./__mocks__/places";
import DATES from "./__mocks__/date";

describe("Snapshots", () => {
  test("Renders correctly", () => {
    const component = renderer.create(<Info place={PLACES[0]} date={DATES[0]} />);
    expect(component.toJSON()).toMatchSnapshot();

    component.update(<Info place={PLACES[1]} date={DATES[1]} />);
    expect(component.toJSON()).toMatchSnapshot();

    component.update(<Info place={PLACES[2]} date={DATES[2]} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
