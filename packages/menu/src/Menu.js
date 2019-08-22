import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";

import stylesheet from "./stylesheet";
import { variants, AVAILABLE_VARIANTS } from "./constants";
import MenuSectionPresenter from "./presenters/MenuSectionPresenter";
import MenuItem from "./MenuItem";
import { MenuItemsPropType } from "./propTypes";

export default class Menu extends Component {
  static propTypes = {
    /** Width of the menu */
    width: PropTypes.string,
    /** Function to modify the component's styles */
    stylesheet: PropTypes.func,
    variant: PropTypes.oneOf(AVAILABLE_VARIANTS),
    /** Items */
    items: MenuItemsPropType,
    checkmark: PropTypes.bool,
    multiple: PropTypes.bool,
    selected: PropTypes.oneOfType([
      PropTypes.any,
      PropTypes.arrayOf(PropTypes.any)
    ]),
    onMenuItemClicked: PropTypes.func
  };

  static defaultProps = {
    width: "auto",
    items: [],
    variant: variants.BASIC,
    checkmark: false,
    multiple: false,
    onMenuItemClicked: () => {}
  };

  getMenuSections = items =>
    items.every(item => Object.prototype.hasOwnProperty.call(item, "items"))
      ? items
      : [{ items }];

  getFlattenedMenuItems = items =>
    this.getMenuSections(items).reduce(
      (previousValue, section) => [...previousValue, ...section.items],
      []
    );

  getMenuItemIds = items =>
    this.getFlattenedMenuItems(items).map(item => item.id);

  renderMenuItem = (item, sectionProps) => {
    const { selected, multiple } = this.props;
    const checked =
      multiple && Array.isArray(selected)
        ? selected.includes(item.id)
        : selected === item.id;

    const payload = {
      ...sectionProps,
      ...item,
      checked,
      multiple,
      checkmark: this.props.checkmark
    };
    return <MenuItem key={item.id} {...payload} />;
  };

  renderMenuSections = () => {
    const {
      items: menuItems,
      variant: menuVariant,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;

    const { className: menuClassName } = otherProps;
    const sectionClassNameFromMenu = createCustomClassNames(
      menuClassName,
      "section"
    );

    return this.getMenuSections(menuItems).map((section, index) => {
      const { label, variant, items, className } = section;

      const payload = {
        index,
        label,
        variant: variant || menuVariant,
        stylesheet: customStylesheet,
        className: cx(sectionClassNameFromMenu, className)
      };

      return (
        <MenuSectionPresenter
          key={label ? `${label}-${index}` : index}
          {...payload}
        >
          {items.map(item => this.renderMenuItem(item, payload))}
        </MenuSectionPresenter>
      );
    });
  };

  render() {
    const { stylesheet: customStylesheet, ...otherProps } = this.props;
    const { className } = otherProps;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {
          const styles = stylesheet(
            {
              stylesheet: customStylesheet
            },
            resolvedRoles,
            metadata
          );

          return (
            <div className={cx(css(styles.wrapper), className)}>
              {this.renderMenuSections()}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
