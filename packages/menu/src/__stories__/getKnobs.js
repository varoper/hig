import { action } from "@storybook/addon-actions";
import { boolean, object, select, text } from "@storybook/addon-knobs/react";

const knobGroupIds = {
  basic: "Basic",
  advanced: "Advanced"
};

const knobLabels = {
  multiple: "Multiple",
  onChange: "onChange",
  onClick: "onClick",
  options: "Options",
};

export default function getKnobs(props) {
  const {
    disabled = false,
    multiple = false,
    options = [],
    ...otherProps
  } = props;

  /**
   * We're using `text` instead of `object` so that we can provide `undefined`
   * when an empty string is given.
   */

  return {
    ...otherProps,
    multiple: boolean(knobLabels.multiple, multiple, knobGroupIds.basic),
    onChange: action(knobLabels.onChange),
    onClick: action(knobLabels.onClick),
    options: object(knobLabels.options, options, knobGroupIds.basic)
  };
}
