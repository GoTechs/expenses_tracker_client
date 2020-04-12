import React from "react";
import { shallow, mount } from "enzyme";
import ForgetPassword from "./index";

describe("Input should change value when onChange was called", () => {
  it("has default state properties", () => {
    const map = shallow(<ForgetPassword />);
    const defaultState = {
      formConfig: {
        elementType: "input",
        label: "Email address*",
        elementConfig: {
          type: "email",
          placeholder: "",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        errorText: "You have entered invalid email address",
        value: "",
      },
      loading: false,
    };
    expect(map.state()).toMatchObject(defaultState);
  });
  it("email check", () => {
    const wrapper = shallow(<ForgetPassword />);
    const event = {
      target: {
        value: "slimane@gmail.com",
      },
    };
    wrapper.find("input").simulate("change", event);
    expect(wrapper.state("value")).toEqual("slimane@gmail.com");
  });

});
