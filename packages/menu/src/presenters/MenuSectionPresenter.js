import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";

import stylesheet from "../stylesheet";
import { variants, AVAILABLE_VARIANTS } from "../constants";

export default class MenuSectionPresenter extends Component {
  static propTypes = {
    index: PropTypes.number,
    /** Text label of the menu section */
    label: PropTypes.string,
    variant: PropTypes.oneOf(AVAILABLE_VARIANTS),
    checkmark: PropTypes.bool,
    /** Function to modify the menu item's styles */
    stylesheet: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    variant: variants.BASIC,
    checkmark: false
  };

  render() {
    const {
      index,
      label,
      variant,
      checkmark,
      children,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;

    const { className } = otherProps;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {
          const styles = stylesheet(
            {
              label,
              variant,
              checkmark,
              stylesheet: customStylesheet
            },
            resolvedRoles,
            metadata
          );

          if (index === 0) {
            styles.sectionWrapper.borderTop = "0";
          }

          const labelClassName = createCustomClassNames(
            className,
            "section-label"
          );

          return (
            <div className={cx(css(styles.sectionWrapper), className)}>
              {Boolean(label) && (
                <div className={cx(css(styles.sectionLabel), labelClassName)}>
                  {label}
                </div>
              )}
              {children}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
