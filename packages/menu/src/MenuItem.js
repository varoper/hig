import React, { Component } from "react";
import PropTypes from "prop-types";
import { ControlBehavior } from "@hig/behaviors";

import { variants, AVAILABLE_VARIANTS } from "./constants";
import { MenuItemsPropType } from "./propTypes";
import MenuItemPresenter from "./presenters/MenuItemPresenter";

export default class MenuItem extends Component {
  static propTypes = {
    /**
     * Prevents user interaction with the button
     */
    disabled: PropTypes.bool,
    /**
     * A @hig/icon element
     */
    icon: PropTypes.node,
    /**
     * Sets the link of a button
     */
    link: PropTypes.string,
    checkmark: PropTypes.bool,
    /**
     * Triggers blur when focus is moved away from icon
     */
    onBlur: PropTypes.func,
    /**
     * Triggers when you click the button
     */
    onClick: PropTypes.func,
    /**
     * Triggers when focus is moved to button
     */
    onFocus: PropTypes.func,
    /**
     * Triggers when you hover over the button
     */
    onHover: PropTypes.func,
    /**
     * Triggers when the user's mouse is pressed over the button
     */
    onMouseDown: PropTypes.func,
    /**
     * Triggers when the user's mouse is over the button
     */
    onMouseEnter: PropTypes.func,
    /**
     * Triggers when the user's mouse is no longer over the button
     */
    onMouseLeave: PropTypes.func,
    /**
     * Triggers when the user's mouse is no longer pressed over the button
     */
    onMouseUp: PropTypes.func,
    /**
     * Adds custom/overriding styles
     */
    stylesheet: PropTypes.func,
    /**
     * Sets the title of a button
     */
    label: PropTypes.string.isRequired,
    /**
     * Specifies type of button
     */
    variant: PropTypes.oneOf(AVAILABLE_VARIANTS),
    items: MenuItemsPropType
  };

  static defaultProps = {
    disabled: false,
    variant: variants.BASIC
  };

  render() {
    const {
      disabled,
      icon,
      link,
      items,
      checkmark,
      onBlur,
      onClick,
      onFocus,
      onHover,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      stylesheet,
      label,
      variant,
      ...otherProps
    } = this.props;

    return (
      <ControlBehavior
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
      >
        {({
          hasFocus,
          hasHover,
          isPressed,
          onBlur: handleBlur,
          onFocus: handleFocus,
          onMouseDown: handleMouseDown,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onMouseUp: handleMouseUp
        }) => (
          <MenuItemPresenter
            {...otherProps}
            items={items}
            disabled={disabled}
            hasFocus={hasFocus}
            hasHover={hasHover}
            isPressed={isPressed}
            icon={icon}
            link={link}
            onBlur={handleBlur}
            onClick={onClick}
            onFocus={handleFocus}
            onHover={onHover}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            stylesheet={stylesheet}
            label={label}
            variant={variant}
            checkmark={checkmark}
          />
        )}
      </ControlBehavior>
    );
  }
}
