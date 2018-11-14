const cssObjectToString = require("./cssObjectToString.js");

module.exports = cssObjectToString(styles());

function styles() {
  return {
    "*": {
      "box-sizing": "border-box"
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
      "min-height": "100vh"
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

    ".text": {
      color: "#fdfdfd"
    },

    ".footer": {
      "font-size": "12px",
      "text-align": "left",
      color: "#fdfdfd",
      padding: "10px",
      "border-top": "1px solid #fdfdfd",
      position: "absolute",
      height: "60px",
      display: "flex",
      "align-items": "center",
      bottom: 0,
      left: 0,
      right: 0
    }
  };
}
