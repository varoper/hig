import PropTypes from "prop-types";

export const MenuItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string
});

export const MenuSectionPropType = PropTypes.shape({
  label: PropTypes.string,
  items: PropTypes.arrayOf(MenuItemPropType)
});

export const MenuItemsPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(MenuItemPropType),
  PropTypes.arrayOf(MenuSectionPropType)
]);
