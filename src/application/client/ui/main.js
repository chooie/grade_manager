const React = require("./react.js");
const ReactDOM = require("./react-dom.js");

const e = React.createElement;

class GradeApp extends React.Component {
  constructor(props) {
    super(props);
    this.students = [];
  }

  render() {
    return e(
      "div",
      null,
      e("h1", { className: "header" }, "Students"),
      e(Students.bind(null, this.students))
    );
  }
}

function Students(students) {
  if (students.length < 1) {
    return dangerousElement(
      "p",
      { className: "text" },
      "No students &mdash; Add one!"
    );
  }
  return e("p", { className: "text" }, "Students go here...");
}

function dangerousElement(elementName, props, text) {
  return e(
    "p",
    Object.assign({}, props, { dangerouslySetInnerHTML: { __html: text } })
  );
}

exports.setup = function setup() {
  ReactDOM.render(e(GradeApp), document.querySelector("#app-container"));
};

exports.isTrue = function isTrue() {
  return true;
};
