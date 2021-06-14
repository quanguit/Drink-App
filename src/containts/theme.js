import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#fc5603", // orange
  secondary: "#CDCDD2", // gray

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",

  lightGray: "#adad85",
  lightGray2: "#B7B7B2",
  lightGray3: "#CDCFCB",
  lightGray4: "#ebebe0",
  transparent: "transparent",
  darkgray: "#898C95",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 19,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
