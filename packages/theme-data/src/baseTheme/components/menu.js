import {
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  BORDER_RADIUS,
  COLOR,
  LENGTH,
  SPACING,
  OPACITY
} from "../../consts/types";

export default {
  "menu.backgroundColor": {
    type: COLOR,
    value: {
      ref: "colorScheme.component.backgroundColor"
    }
  },
  "menu.borderRadius": {
    type: BORDER_RADIUS,
    value: {
      ref: "basics.borderRadii.none"
    }
  },
  "menu.topFlushBorderTopRadius": {
    type: BORDER_RADIUS,
    value: {
      ref: "basics.borderRadii.none"
    }
  },
  "menu.item.backgroundColor": {
    type: COLOR,
    value: {
      ref: "colorScheme.component.backgroundColor"
    }
  },
  // "menu.item.hover.backgroundColor": {
  //   type: COLOR,
  //   value: {
  //     ref: "colorScheme.baseColor"
  //   },
  //   transform: {
  //     alpha: 0.1
  //   }
  // },
  "menu.item.focus.backgroundColor": {
    type: COLOR,
    value: {
      ref: "menu.item.hover.backgroundColor"
    }
  },
  "menu.item.active.backgroundColor": {
    type: COLOR,
    value: {
      ref: "colorScheme.accentColor"
    },
    transform: {
      alpha: 0.1
    }
  },
  // "menu.item.horizontalPadding": {
  //   type: SPACING,
  //   value: {
  //     ref: "density.spacings.extraSmall"
  //   }
  // },
  "menu.item.verticalPadding": {
    type: SPACING,
    value: {
      ref: "basics.spacings.mediumSmall"
    }
  },
  "menu.item.minHeight": {
    type: LENGTH,
    value: {
      ref: "density.spacings.large"
    }
  },
  "menu.item.gutterWidth": {
    type: SPACING,
    value: {
      ref: "basics.spacings.mediumSmall"
    }
  },

  // new menu
  "menu.section.verticalPadding": {
    type: SPACING,
    value: { ref: "density.spacings.small" }
  },
  "menu.section.borderColor": {
    type: COLOR,
    value: { ref: "colorScheme.textColor" },
    transform: { alpha: "0.1" }
  },
  "menu.section.label.fontFamily": {
    type: FONT_FAMILY,
    value: { ref: "basics.fontFamilies.main" }
  },
  "menu.section.label.fontSize": {
    type: FONT_SIZE,
    value: { ref: "typography.caption.fontSize" }
  },
  "menu.section.label.lineHeight": {
    type: LINE_HEIGHT,
    value: { ref: "typography.caption.lineHeight" }
  },
  "menu.section.label.fontWeight": {
    type: FONT_WEIGHT,
    value: { ref: "basics.fontWeights.bold" }
  },
  "menu.section.label.color": {
    type: COLOR,
    value: { ref: "colorScheme.textColor" },
    transform: { alpha: "0.5" }
  },

  "menu.item.horizontalPadding": {
    type: SPACING,
    value: { ref: "density.spacings.small" }
  },
  "menu.item.label.fontFamily": {
    type: FONT_FAMILY,
    value: { ref: "basics.fontFamilies.main" }
  },
  "menu.item.label.fontSize": {
    type: FONT_SIZE,
    value: { ref: "typography.body.fontSize" }
  },
  "menu.item.label.lineHeight": {
    type: LINE_HEIGHT,
    value: { ref: "typography.body.lineHeight" }
  },
  "menu.item.label.fontWeight": {
    type: FONT_WEIGHT,
    value: { ref: "basics.fontWeights.regular" }
  },
  "menu.item.label.color": {
    type: COLOR,
    value: { ref: "colorScheme.textColor" }
  },
  "menu.item.label.verticalMargin": {
    type: SPACING,
    value: "6px"
  },
  "menu.item.icon.verticalMargin": {
    type: SPACING,
    value: { ref: "density.spacings.extraExtraSmall" }
  },
  "menu.item.avatar.verticalMargin": {
    type: SPACING,
    value: { ref: "density.spacings.extraExtraSmall" }
  },
  "menu.item.thumb.verticalMargin": {
    type: SPACING,
    value: { ref: "density.spacings.extraExtraSmall" }
  },
  "menu.item.thumb.size": {
    type: LENGTH,
    value: { ref: "density.spacings.extraLarge" }
  },
  "menu.item.thumb.borderRadius": {
    type: LENGTH,
    value: "1px"
  },
  "menu.item.checkmark.width": {
    type: LENGTH,
    value: { ref: "density.spacings.medium" }
  },
  "menu.item.checkmark.marginRight": {
    type: SPACING,
    value: { ref: "density.spacings.extraExtraSmall" }
  },
  "menu.item.checkmark.color": {
    type: COLOR,
    value: { ref: "colorScheme.accentColor" }
  },
  "menu.item.checkmark.hover.color": {
    type: COLOR,
    value: { ref: "colorScheme.baseColor" },
    transform: { alpha: 0.4 }
  },
  // disabled
  "menu.item.disabled.opacity": {
    type: OPACITY,
    value: { ref: "component.disabled.opacity" }
  },
  // hover
  "menu.item.hover.backgroundColor": {
    type: COLOR,
    value: { ref: "colorScheme.baseColor" },
    transform: { alpha: 0.08 }
  },
  // pressed
  "menu.item.pressed.backgroundColor": {
    type: COLOR,
    value: { ref: "colorScheme.baseColor" },
    transform: { alpha: 0.2 }
  }
};
