import React, { Component } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { cx } from "emotion";
// import MultiDownshift from "@hig/multi-downshift";

// import InputPresenter from "./presenters/InputPresenter";
import MenuPresenter from "./presenters/MenuPresenter";
import renderWrapper from "./presenters/WrapperPresenter";
import renderOptions from "./presenters/renderOptions";

/** @typedef {import("./presenters/renderOptions").OptionMeta} OptionMeta */
/** @typedef {import("downshift").ControllerStateAndHelpers} DownshiftHelpers */

export default class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * The default value when the component is uncontrolled
     */
    
  };

  static defaultProps = {
    /**
     * @param {OptionMeta} option
     * @returns {string}
     */
    formatOption(option) {
      return option ? String(option) : "";
    }
  };

  getBehaviorProps() {
    const { id, multiple, formatOption, value, defaultValue } = this.props;
    const valuePropName = multiple ? "selectedItems" : "selectedItem";
    const defaultValuePropName = multiple
      ? "initialSelectedItems"
      : "initialSelectedItem";

    return {
      id,
      onChange: this.handleChange,
      itemToString: formatOption,
      [valuePropName]: value,
      [defaultValuePropName]: defaultValue
    };
  }

  /**
   * > Why not just pass the `props.onChange` directly to Downshift?
   *
   *  Downshift provides all of it's helpers and state to `onChange`.
   *  We don't want to expose the entire Downshift API to consumers.
   *
   * @param {OptionMeta | OptionMeta[]} value
   * @param {DownshiftHelpers} downshift
   */
  handleChange = value => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }
  };
  
  /**
   * @param {DownshiftHelpers} downshift
   * @returns {JSX.Element}
   */
  renderMenu(downshift) {
    

    return (
      <MenuPresenter key="menu">
        {children}
      </MenuPresenter>
    );
  }

  /**
   * @param {DownshiftHelpers} downshift
   * @returns {JSX.Element}
   */
  renderPresenter = downshift => {
    const {
      children,
      defaultValue,
      formatOption,
      id,
      multiple,
      onBlur,
      onChange,
      onClick,
      onFocus,
      options,
      renderOption,
      ...otherProps
    } = this.props;

    /**
     * The `Wrapper` presenter is used as a function to avoid having to
     * use Downshift's `getRootProps`
     * @see https://github.com/paypal/downshift#getrootprops
     */
    return renderWrapper({
      children: [this.renderMenu(downshift)],
      ...otherProps
    });
  };

  render() {
    const { children, ...otherProps } = this.props;
    // const Behavior = multiple ? MultiDownshift : Downshift;

    return (
      <MenuPresenter {...otherProps}>
        {children}
      </MenuPresenter>
    );
  }
}
