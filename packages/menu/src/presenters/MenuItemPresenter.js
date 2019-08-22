import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";
import Avatar, { sizes as avatarSizes } from "@hig/avatar";
import { CheckmarkSUI, CaretRightMUI } from "@hig/icons";
import Flyout from "@hig/flyout";

import { variants, AVAILABLE_VARIANTS } from "../constants";
import stylesheet from "../stylesheet";
import { MenuItemsPropType } from "../propTypes";

export default class MenuItemPresenter extends Component {
  static propTypes = {
    /** Text label of the menu item */
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    icon: PropTypes.node,
    avatar: PropTypes.string,
    thumb: PropTypes.string,
    checkmark: PropTypes.bool,
    disabled: PropTypes.bool,
    stylesheet: PropTypes.func,
    variant: PropTypes.oneOf(AVAILABLE_VARIANTS),
    hasFocus: PropTypes.bool,
    hasHover: PropTypes.bool,
    isPressed: PropTypes.bool,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onHover: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    items: MenuItemsPropType
  };

  static defaultProps = {
    checked: false,
    checkmark: false,
    variant: variants.BASIC
  };

  render() {
    const {
      label,
      checked,
      variant,
      checkmark,
      icon,
      avatar,
      thumb,
      items,
      hasFocus,
      hasHover,
      isPressed,
      disabled,
      onBlur,
      onClick,
      onFocus,
      onHover,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      ...otherProps
    } = this.props;

    const { className } = otherProps;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {
          const styles = stylesheet(this.props, resolvedRoles, metadata);

          const labelClassName = createCustomClassNames(
            className,
            "item-label"
          );
          const checkmarkClassName = createCustomClassNames(
            className,
            "item-checkmark"
          );
          const iconClassName = createCustomClassNames(className, "item-icon");
          const avatarClassName = createCustomClassNames(
            className,
            "item-avatar"
          );
          const thumbClassName = createCustomClassNames(
            className,
            "item-thumb"
          );
          const hasSubMenu = items && items.length > 0;

          return (
            <Flyout content={<p>abc</p>}>
              <button
                className={cx(css(styles.itemWrapper), className)}
                onBlur={onBlur}
                onClick={onClick}
                onFocus={onFocus}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseOver={onHover}
                onMouseUp={onMouseUp}
                disabled={disabled}
              >
                {checkmark && (
                  <div
                    className={cx(css(styles.itemCheckmark), checkmarkClassName)}
                  >
                    <CheckmarkSUI />
                  </div>
                )}
                {variant === variants.WITH_ICON && (
                  <div className={cx(css(styles.itemIcon), iconClassName)}>
                    {icon}
                  </div>
                )}
                {variant === variants.WITH_AVATAR && (
                  <div className={cx(css(styles.itemAvatar), avatarClassName)}>
                    <Avatar
                      name={label}
                      image={avatar}
                      size={avatarSizes.MEDIUM_32}
                    />
                  </div>
                )}
                {variant === variants.WITH_THUMB && (
                  <div
                    className={cx(css(styles.itemThumb), thumbClassName)}
                    style={{ backgroundImage: `url(${thumb})` }}
                  />
                )}
                <div className={cx(css(styles.itemLabel), labelClassName)}>
                  {label}
                </div>
                {hasSubMenu && (
                  <div
                    className={cx(
                      css(styles.itemSubMenuIndicator),
                      labelClassName
                    )}
                  >
                    <CaretRightMUI />
                  </div>
                )}
              </button>
            </Flyout>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
