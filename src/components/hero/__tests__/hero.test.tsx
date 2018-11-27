import React from "react";
import renderer from "react-test-renderer";

import { COLORS } from "@/modifiers/colors";
import { Hero } from "../hero";

describe("Hero component", () => {
  it("Should exist", () => {
    expect(Hero).toMatchSnapshot();
  });

  it("Should expose Hero head, body and footer", () => {
    expect(Hero.Head).toMatchSnapshot();
    expect(Hero.Body).toMatchSnapshot();
    expect(Hero.Footer).toMatchSnapshot();
  });

  it("Should have hero classname", () => {
    const component = renderer.create(
      <Hero>
        Test <a>Give me</a>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Hero className="other-class this-is-a-test">
        <p>Default</p>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should use inline styles", () => {
    const component = renderer.create(
      <Hero style={{ height: 250 }}>
        <p>Default</p>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should use gradient style", () => {
    const component = renderer.create(
      <Hero color={"primary" as "primary"} gradient>
        <p>Default</p>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should render Hero with hero head, body and footer", () => {
    const component = renderer.create(
      <Hero size={"fullheight" as "fullheight"} color={"primary" as "primary"}>
        <Hero.Head renderAs="header">
          <div className="bd-notification is-info">Header</div>
        </Hero.Head>
        <Hero.Body>Body</Hero.Body>
        <Hero.Footer renderAs="footer">
          <div className="bd-notification is-danger">Footer</div>
        </Hero.Footer>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  COLORS.map(color =>
    it(`Should use use color ${color}`, () => {
      const component = renderer.create(
        <Hero color={color}>
          <p>Default {color}</p>
        </Hero>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );
});
