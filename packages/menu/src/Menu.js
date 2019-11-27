import React, { Component } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { cx } from "emotion";
import MultiDownshift from "@hig/multi-downshift";

// import InputPresenter from "./presenters/InputPresenter";
import MenuPresenter from "./presenters/MenuPresenter";
import renderWrapper from "./presenters/WrapperPresenter";
import renderOptions from "./presenters/renderOptions";

/** @typedef {import("./presenters/renderOptions").OptionMeta} OptionMeta */
/** @typedef {import("downshift").ControllerStateAndHelpers} DownshiftHelpers */

export default class Dropdown extends Component {
  static propTypes = {
    /**
     * The default value when the component is uncontrolled
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.any,
      PropTypes.arrayOf(PropTypes.any)
    ]),
    /**
     * Used to format options into human readable strings
     *
     * Note that if both formatOption and renderOption are provided,
     * renderOption will take precedence
     */
    formatOption: PropTypes.func,
    /**
     * HTML ID attribute
     */
    id: PropTypes.string,
    /**
     * Enables multiple selection
     */
    multiple: PropTypes.bool,
    /**
     * Called when the text field is blurred
     */
    onBlur: PropTypes.func,
    /**
     * Called with the selected option when the value changes
     */
    onChange: PropTypes.func,
    /**
     * Called when the text field is focused
     */
    onFocus: PropTypes.func,
    /**
     * An array of unique values of any type except `undefined`
     * If you use an array of objects, the object must contain the property `item`,
     * the option's disabled state can be controlled with a `disabled` property.
     */
    onOptionClick: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.any),
    /**
     * When present, this function is used to render each option.  Each
     * option is passed as an argument. If any option has Option.render
     * prop present, that will take precedence and this
     * function will not be called for that option.
     *
     * In  addition to the option passed as an argument, props
     * are also passed in that can be used for each option to help
     * maintain some of the built-in `Dropdown` option functionality.
     *
     * Similarly if both formatOption and renderOption are provided,
     * renderOption will take precedence
     */
    renderOption: PropTypes.func,
    /**
     * An array of objects to choose from
     */
    value: PropTypes.oneOfType([
      PropTypes.any,
      PropTypes.arrayOf(PropTypes.any)
    ]),
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
    const {
      getItemProps,
      getMenuProps,
      highlightedIndex,
      // isOpen,
      selectedItem,
      selectedItems
    } = downshift;

    const {
      formatOption,
      multiple,
      onOptionClick,
      options,
      renderOption,
      ...otherProps
    } = this.props;

    const { className } = otherProps;

    const menuClassName =
      className &&
      className
        .split(" ")
        .reduce((acc, cur) => cx(acc, `${cur.trim()}-menu-wrapper`), "");

    const menuProps = getMenuProps({
      isOpen: true,
      refKey: "innerRef",
      className: menuClassName
    });

    const children = renderOptions({
      formatOption,
      getItemProps,
      highlightedIndex,
      multiple,
      onOptionClick,
      options,
      renderOption,
      selectedItem,
      selectedItems
    });

    return (
      <MenuPresenter key="menu" {...menuProps}>
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
    const { multiple } = this.props;
    const Behavior = multiple ? MultiDownshift : Downshift;

    return (
      <Behavior {...this.getBehaviorProps()}>{this.renderPresenter}</Behavior>
    );
  }
}
