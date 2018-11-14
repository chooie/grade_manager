const React = require("./react.js");
const ReactDOM = require("./react-dom.js");

const GradeApp = require("./grade_app_class.js");

const e = React.createElement;

exports.setup = function setup() {
  const appContainer = document.querySelector("#app-container");
  try {
    ReactDOM.render(e(GradeApp), appContainer);
  } catch (error) {
    appContainer.innerHTML = '<p class="text">Something went wrong :(</p>';
    throw new Error(error);
  }
};

exports.isTrue = function isTrue() {
  return true;
};
