import React from "react";
import PropTypes from "prop-types";
import { cx, css } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import stylesheet from "./MenuPresenter.stylesheet";

export default function MenuPresenter(props) {
  const { innerRef, isOpen, children, ...otherProps } = props;
  const { className } = otherProps;
  return (
    <ThemeContext.Consumer>
      {({ resolvedRoles }) => {
        console.log(props.children);
        console.log(React.Children.toArray(props.children)[0].type);
        return(
          <div
            {...otherProps}
            ref={innerRef}
            aria-activedescendant="hello"
            aria-expanded={true}
            role="listbox"
            onKeyDown={event => {console.log(event.keyCode)}}
            onClick={event => {console.log(event)}}
            className={cx(css(stylesheet(props, resolvedRoles)), className)}
            tabIndex="0"
          >
            {children}
          </div>
        );
    }}
    </ThemeContext.Consumer>
  );
}

MenuPresenter.propTypes = {
  // innerRef: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  children: PropTypes.node
};
