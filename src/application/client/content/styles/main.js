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
      padding: "0.5rem"
    },

    ".page-container--light": {
      background: "#2b2b2b"
    },

    ".main-content-container": {
      "max-width": "1000px",
      margin: "auto",
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

    ".large-text": {
      "font-size": "1.5rem"
    },

    ".student-form": {
      "text-align": "center",
      "max-width": "500px",
      margin: "auto"
    },

    ".student-form__text-input": {
      width: "100%",
      height: "3.0rem",
      border: "0.2rem solid #cdad00",
      "border-radius": "0.5rem",
      "padding-left": "1rem",
      "padding-right": "1rem",
      "font-size": "1.5rem",
      "margin-top": "1rem",
      "margin-bottom": "1rem"
    },

    ".valid": {
      border: "0.2rem solid green"
    },

    ".error": {
      border: "0.2rem solid red"
    },

    ".student": {
      display: "flex",
      "justify-content": "center",
      "justify-items": "center",
      padding: "0.5rem",
      "margin-bottom": "1rem",
      "border-radius": "0.7rem"
    },

    ".student.fail": {
      background: "#865050"
    },

    ".student__header": {
      "padding-bottom": "1rem"
    },

    ".student__name": {
      display: "inline-flex",
      "align-items": "center",
      width: "70%",
      hyphens: "auto"
    },

    ".student__name.input": {
      color: "black"
    },

    ".student__grade": {
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "flex-end",
      width: "20%"
    },

    ".student__grade.input": {
      color: "black"
    },

    ".student__delete": {
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "center",
      width: "10%",
      "text-align": "right"
    },

    ".student__delete__icon": {
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "center",
      background: "red",
      "font-size": "0.8rem",
      width: "1rem",
      height: "1rem",
      "border-radius": "2rem",
      cursor: "pointer"
    },

    ".student-statistics": {
      "padding-bottom": "1rem",
      "font-size": "1.3rem"
    },

    ".student-statistics__title": {
      display: "flex",
      "justify-content": "center"
    },

    ".student-statistics__headers__column": {
      display: "inline-block",
      width: "33.333333%",
      "text-align": "center",
      "padding-bottom": "0.5rem"
    },

    ".student-statistics__row__column": {
      display: "inline-block",
      width: "33.333333%",
      "text-align": "center"
    },

    ".center-containing-text": {
      "text-align": "center"
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
      opacity: 0.1
    },

    ".button:active": {
      transform: "translateY(5px)",
      "box-shadow": "0 3px rgb(205, 173, 0)",
      filter: "brightness(90%)"
    },

    ".gold": {
      color: "rgb(205, 173, 0)"
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
