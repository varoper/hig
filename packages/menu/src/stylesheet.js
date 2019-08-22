function getItemBackground({ isPressed, hasHover, disabled }, themeData) {
  if (disabled) {
    return "transparent";
  }
  if (isPressed) {
    return themeData["menu.item.pressed.backgroundColor"];
  }
  if (hasHover) {
    return themeData["menu.item.hover.backgroundColor"];
  }
  return "transparent";
}

function getCheckmarkColor(
  { hasHover, checked, multiple, disabled },
  themeData
) {
  if (checked) {
    return themeData["menu.item.checkmark.color"];
  }
  if (hasHover && multiple && !disabled) {
    return themeData["menu.item.checkmark.hover.color"];
  }
  return "none";
}

export default function stylesheet(props, themeData, themeMeta) {
  const {
    width,
    stylesheet: customStylesheet,
    disabled,
    hasHover,
    isPressed,
    checked,
    multiple
  } = props;

  const styles = {
    wrapper: {
      height: "auto",
      width: width || "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch"
    },
    sectionWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      padding: `${themeData["menu.section.verticalPadding"]} 0`,
      borderTop: `1px solid ${themeData["menu.section.borderColor"]}`
    },
    sectionLabel: {
      fontFamily: themeData["menu.section.label.fontFamily"],
      fontSize: themeData["menu.section.label.fontSize"],
      fontWeight: themeData["menu.section.label.fontWeight"],
      lineHeight: themeData["menu.section.label.lineHeight"],
      color: themeData["menu.section.label.color"],
      textTransform: "uppercase",
      padding: `0 ${themeData["menu.item.horizontalPadding"]} ${
        themeData["menu.section.verticalPadding"]
      } ${themeData["menu.item.horizontalPadding"]}`
    },
    itemWrapper: {
      display: "flex",
      alignItems: "center",
      padding: `0 ${themeData["menu.item.horizontalPadding"]}`,
      backgroundColor: getItemBackground(
        { isPressed, hasHover, disabled },
        themeData
      ),
      outline: "none",
      textAlign: "left",
      border: 0,
      opacity: disabled ? themeData["menu.item.disabled.opacity"] : 1
    },
    itemLabel: {
      fontFamily: themeData["menu.item.label.fontFamily"],
      fontSize: themeData["menu.item.label.fontSize"],
      fontWeight: themeData["menu.item.label.fontWeight"],
      lineHeight: themeData["menu.item.label.lineHeight"],
      color: themeData["menu.item.label.color"],
      margin: `${themeData["menu.item.label.verticalMargin"]} 0`,
      flexGrow: 1,
      flexShrink: 1
    },
    itemCheckmark: {
      display: "flex",
      width: themeData["menu.item.checkmark.width"],
      marginRight: themeData["menu.item.checkmark.marginRight"],
      "& svg *": {
        fill: getCheckmarkColor(
          { hasHover, checked, multiple, disabled },
          themeData
        ),
        transitionDuration: `0.3s`,
        transitionProperty: `fill`
      }
    },
    itemIcon: {
      display: "flex",
      margin: `${themeData["menu.item.icon.verticalMargin"]} ${
        themeData["menu.item.horizontalPadding"]
      } ${themeData["menu.item.icon.verticalMargin"]} 0`,
      flexGrow: 0,
      flexShrink: 0
    },
    itemAvatar: {
      display: "flex",
      margin: `${themeData["menu.item.avatar.verticalMargin"]} ${
        themeData["menu.item.horizontalPadding"]
      } ${themeData["menu.item.avatar.verticalMargin"]} 0`,
      flexGrow: 0,
      flexShrink: 0
    },
    itemThumb: {
      display: "flex",
      margin: `${themeData["menu.item.thumb.verticalMargin"]} ${
        themeData["menu.item.horizontalPadding"]
      } ${themeData["menu.item.thumb.verticalMargin"]} 0`,
      flexGrow: 0,
      flexShrink: 0,
      borderRadius: themeData["menu.item.thumb.borderRadius"],
      backgroundSize: "cover",
      width: themeData["menu.item.thumb.size"],
      height: themeData["menu.item.thumb.size"]
    }
  };

  if (customStylesheet) {
    return customStylesheet(styles, props, themeData, themeMeta);
  }
  return styles;
}
