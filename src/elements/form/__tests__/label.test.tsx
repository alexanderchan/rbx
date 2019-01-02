import React from "react";

import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Label, LABEL_SIZES } from "../label";
import { Radio } from "../radio";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Label;
const COMPONENT_NAME = "Label";
const DEFAULT_ELEMENT = "label";
const BULMA_CLASS_NAME = "label";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("disabled", () => {
      validateBoolPropType(propTypes, "disabled");

      [false, true].map(disabled =>
        it(`should ${disabled ? "" : "not "}be disabled`, () => {
          const node = makeNode({ disabled });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-disabled")).toBe(disabled);
        }),
      );
    });

    describe("discriminator", () => {
      [
        { discriminator: "input", className: "label" },
        { discriminator: "checkbox-as-component", className: "checkbox" },
        { discriminator: "checkbox-as-input", className: "checkbox" },
        { discriminator: "radio-as-component", className: "radio" },
        { discriminator: "radio-as-input", className: "radio" },
        { discriminator: "string", className: "label" },
        { discriminator: "fragment-radio", className: "radio" },
        { discriminator: "fragment-empty", className: "label" },
        { discriminator: "compound-radio", className: "radio" },
        { discriminator: "empty", className: "label" },
      ].map(({ discriminator, className }) =>
        it(`should have bulma className ${className} for discriminator ${discriminator}`, () => {
          let children: JSX.Element | string | JSX.Element[] | null;
          if (discriminator === "input") {
            children = <Input />;
          } else if (discriminator === "checkbox-as-input") {
            children = <input type="checkbox" />;
          } else if (discriminator === "checkbox-as-component") {
            children = <Checkbox />;
          } else if (discriminator === "radio-as-component") {
            children = <Radio />;
          } else if (discriminator === "radio-as-input") {
            children = <input type="radio" />;
          } else if (discriminator === "fragment-radio") {
            children = <React.Fragment children={<Radio />} />;
          } else if (discriminator === "fragment-empty") {
            children = <React.Fragment />;
          } else if (discriminator === "compound-radio") {
            children = [React.createElement("div"), React.createElement(Radio)];
          } else if (discriminator === "empty") {
            children = null;
          } else {
            children = discriminator;
          }
          const node = makeNode({ children });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(className)).toBe(true);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", LABEL_SIZES);

      LABEL_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
