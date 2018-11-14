const cssObjectToString = require("./cssObjectToString.js");

module.exports = cssObjectToString(styles());

function styles() {
  return {
    "*": {
      "box-sizing": "border-box"
    },

    "*:focus": {
      outline: "none"
    },

    html: {
      "font-size": "18px",
      "font-family": "sans-serif"
    },

    body: {
      overflow: "auto",
      margin: 0,
      background: "#2b2b2b"
    },

    // Prevent margin collapsing whereby child element margins are applied to
    // the parent
    ".page-container:before": {
      content: '""',
      display: "table"
    },

    ".page-container": {
      position: "relative",
      "text-align": "center",
      "margin-left": "auto",
      "margin-right": "auto",
      "min-height": "100vh",
      padding: "1rem"
    },

    ".page-container--light": {
      background: "#2b2b2b"
    },

    ".main-content-container": {
      "padding-bottom": "60px"
    },

    ".header": {
      display: "inline-block",
      "font-size": "2rem",
      "text-align": "center",
      color: "#fdfdfd"
    },

    ".catchy-text": {
      "font-size": "6vw",
      "font-weight": 600,
      "text-align": "center",
      color: "#a7a7a7",
      "margin-top": 0
    },

    ".container--contact-link": {
      "text-align": "center"
    },

    ".contact-link": {
      "font-size": "4vw",
      color: "#cdad00"
    },

    ".app-container": {
      "text-align": "left"
    },

    ".text": {
      color: "#fdfdfd"
    },

    ".student-form": {
      "text-align": "center"
    },

    ".student-form__text-input": {
      width: "100%",
      height: "3.5rem",
      border: "0.2rem solid #cdad00",
      "border-radius": "0.5rem",
      "padding-left": "1rem",
      "padding-right": "1rem",
      "font-size": "2rem",
      "margin-top": "1rem",
      "margin-bottom": "1rem"
    },

    ".student-form__text-input.valid": {
      border: "0.2rem solid green"
    },

    ".student-form__text-input.error": {
      border: "0.2rem solid red"
    },

    ".button": {
      padding: "0.75rem",
      "border-radius": "5px",
      background: "rgb(245, 245, 245)",
      border: "1px solid rgb(205, 173, 0)",
      "box-shadow": "0 8px rgb(205, 173, 0)",
      color: "rgb(43, 43, 43)",
      "margin-top": "1rem"
    },

    ".button[disabled]": {
      opactiy: 0.1
    },

    ".button:active": {
      transform: "translateY(5px)",
      "box-shadow": "0 3px rgb(205, 173, 0)",
      filter: "brightness(90%)"
    },

    ".footer": {
      // Must position absolute so always stays at the bottom even when there's
      // little content
      position: "absolute",
      "border-top": "1px solid #fdfdfd",
      color: "#fdfdfd",
      height: "60px",
      padding: "1rem",
      display: "flex",
      "flex-direction": "column",
      "justify-content": "space-around",
      "align-items": "center",
      bottom: 0,
      left: 0,
      right: 0
    }
  };
}
