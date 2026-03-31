import { createGlobalTheme } from "@vanilla-extract/css";

import { color } from "./token/color.css";
import { font } from "./token/font.css";

export const themeVars = createGlobalTheme(":root", {
  color,
  fontSize: font.fontSize,
  fontWeight: font.fontWeight,
  lineHeight: font.lineHeight,
  letterSpacing: font.letterSpacing
});
