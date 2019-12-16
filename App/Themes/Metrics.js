const withBorderRadius = (position, radius = metrics.baseRadius) => {
  switch (position) {
    case 'bottom':
      return {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      };
    case 'top':
      return {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
      };
    default:
      return {
        borderRadius: radius,
      };
  }
};

const customPaddings = (top, right, bottom, left) => {
  return {
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left,
  };
};

const customMargins = (top, right, bottom, left) => {
  return {
    marginsTop: top,
    marginsRight: right,
    marginsBottom: bottom,
    marginsLeft: left,
  };
};

const metrics = {
  baseMargin: 10,
  doubleBaseMargin: 20,
  baseRadius: 10,
  withBorderRadius,
  customPaddings,
  customMargins,
};

export default metrics;
