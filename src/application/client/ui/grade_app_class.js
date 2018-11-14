const React = require("./react.js");

const StudentAdder = require("./student_adder_class.js");
const e = React.createElement;

module.exports = class GradeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  addStudent(student) {
    this.setState({ students: [...this.state.students, student] });
  }

  render() {
    return e(
      "div",
      null,
      e(StudentAdder.bind(this, { addStudent: this.addStudent.bind(this) })),
      e(Students.bind(null, this.state))
    );
  }
};

function Students(state) {
  const students = state.students;
  const title = e("h1", { className: "header" }, "Students");
  let content;
  if (students.length < 1) {
    content = dangerousElement(
      "p",
      { className: "text" },
      "No students &mdash; Add one!"
    );
  } else {
    content = e(
      "ul",
      null,
      ...students.map(function(student) {
        return e("li", { className: "text" }, student.name);
      })
    );
  }
  return e("div", null, title, content);
}

function dangerousElement(elementName, props, text) {
  return e(
    "p",
    Object.assign({}, props, { dangerouslySetInnerHTML: { __html: text } })
  );
}
