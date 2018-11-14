const React = require("./react.js");

const StudentAdder = require("./student_adder_class.js");
const e = React.createElement;

module.exports = class GradeApp extends React.Component {
  constructor(props) {
    super(props);
    this.students = [];
  }

  render() {
    return e(
      "div",
      null,
      e(StudentAdder),
      e(Students.bind(null, this.students))
    );
  }
};

function Students(students) {
  const title = e("h1", { className: "header" }, "Students");
  let content;
  if (students.length < 1) {
    content = dangerousElement(
      "p",
      { className: "text" },
      "No students &mdash; Add one!"
    );
  } else {
    content = e("p", { className: "text" }, "Students go here...");
  }
  return e("div", null, title, content);
}

function dangerousElement(elementName, props, text) {
  return e(
    "p",
    Object.assign({}, props, { dangerouslySetInnerHTML: { __html: text } })
  );
}
