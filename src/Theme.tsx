// chakra-theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    dark: {
      "1": "#000000",
      "2": "#09090A",
      "3": "#101012",
      "4": "#1F1F22",
    },
    light: {
      "1": "#FFFFFF",
      "2": "#EFEFEF",
      "3": "#7878A3",
      "4": "#5C5C7B",
    },
    primary: {
      "500": "#877EFF",
      "600": "#5D5FEF",
    },
    secondary: {
      "500": "#FFB620",
    },
    offWhite: "#D0DFFF",
    red: "#FF5A5A",
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
  textStyles: {
    h1_bold: {
      fontSize: "36px",
      fontWeight: "bold",
      lineHeight: "140%",
      letterSpacing: "tighter",
    },
    h1_semibold: {
      fontSize: "36px",
      fontWeight: "semibold",
      lineHeight: "140%",
      letterSpacing: "tighter",
    },
    h2_bold: {
      fontSize: "30px",
      fontWeight: "bold",
      lineHeight: "140%",
      letterSpacing: "tighter",
    },
    h3_bold: {
      fontSize: "24px",
      fontWeight: "bold",
      lineHeight: "140%",
      letterSpacing: "tighter",
    },
    base_semibold: {
      fontSize: "16px",
      fontWeight: "semibold",
      lineHeight: "140%",
      letterSpacing: "tighter",
    },
    base_medium: {
      fontSize: "16px",
      fontWeight: "medium",
      lineHeight: "140%",
    },
    base_regular: {
      fontSize: "16px",
      fontWeight: "normal",
      lineHeight: "140%",
    },
    body_bold: {
      fontSize: "18px",
      fontWeight: "bold",
      lineHeight: "140%",
    },
    body_medium: {
      fontSize: "18px",
      fontWeight: "medium",
      lineHeight: "140%",
    },
    small_semibold: {
      fontSize: "14px",
      fontWeight: "semibold",
      lineHeight: "140%",
      letterSpacing: "tighter",
    },
    small_medium: {
      fontSize: "14px",
      fontWeight: "medium",
      lineHeight: "140%",
    },
    small_regular: {
      fontSize: "14px",
      fontWeight: "normal",
      lineHeight: "140%",
    },
    subtle_semibold: {
      fontSize: "12px",
      fontWeight: "semibold",
      lineHeight: "140%",
    },
    tiny_medium: {
      fontSize: "10px",
      fontWeight: "medium",
      lineHeight: "140%",
    },
  },
  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
        listStyle: "none",
        padding: "0",
        margin: "0",
        scrollBehavior: "smooth",
      },

      body: {
        backgroundColor: "dark.1",
        color: "light.1",

        fontFamily: "body",
      },
      "&::-webkit-scrollbar": {
        width: "5px",
        height: "2px",
        borderRadius: "2px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#09090a",
        marginRight: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#7878a3",
        borderRadius: "50px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#5D5FEF",
      },
      ".absolute-center": {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      },
      ".block-center": {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
  },
  components: {
    Typography: {
      h1_bold: {
        fontSize: "36px",
        fontWeight: "bold",
        lineHeight: "140%",
        letterSpacing: "tighter",
      },
      h1_semibold: {
        fontSize: "36px",
        fontWeight: "semibold",
        lineHeight: "140%",
        letterSpacing: "tighter",
      },
      h2_bold: {
        fontSize: "30px",
        fontWeight: "bold",
        lineHeight: "140%",
        letterSpacing: "tighter",
      },
      h3_bold: {
        fontSize: "24px",
        fontWeight: "bold",
        lineHeight: "140%",
        letterSpacing: "tighter",
      },
      base_semibold: {
        fontSize: "16px",
        fontWeight: "semibold",
        lineHeight: "140%",
        letterSpacing: "tighter",
      },
      base_medium: {
        fontSize: "16px",
        fontWeight: "medium",
        lineHeight: "140%",
      },
      base_regular: {
        fontSize: "16px",
        fontWeight: "normal",
        lineHeight: "140%",
      },
      body_bold: {
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "140%",
      },
      body_medium: {
        fontSize: "18px",
        fontWeight: "medium",
        lineHeight: "140%",
      },
      small_semibold: {
        fontSize: "14px",
        fontWeight: "semibold",
        lineHeight: "140%",
        letterSpacing: "tighter",
      },
      small_medium: {
        fontSize: "14px",
        fontWeight: "medium",
        lineHeight: "140%",
      },
      small_regular: {
        fontSize: "14px",
        fontWeight: "normal",
        lineHeight: "140%",
      },
      subtle_semibold: {
        fontSize: "12px",
        fontWeight: "semibold",
        lineHeight: "140%",
      },
      tiny_medium: {
        fontSize: "10px",
        fontWeight: "medium",
        lineHeight: "140%",
      },
    },
    Utilities: {
      invert_white: {
        filter: "invert(1)",
        transition: "brightness 0.3s ease",
      },
      flex_center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      flex_between: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      flex_start: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
  },
});

export default customTheme;
