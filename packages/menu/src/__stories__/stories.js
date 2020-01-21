import React from "react";
import Option from "../presenters/OptionPresenter";

export default [
  {
    description: "default",
    getProps: () => ({
      children: [
        <Option id="hello">hello</Option>,
        <Option id="bye">bye</Option>,
        <Option id="blah">blah</Option>
      ]
    })
  }
];
