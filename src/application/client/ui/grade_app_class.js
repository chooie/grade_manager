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

  deleteStudent(indexToDelete) {
    const newStudents = this.state.students.filter(function(student, index) {
      return index !== indexToDelete;
    });
    this.setState({ students: newStudents });
  }

  render() {
    return e(
      "div",
      null,
      e(StudentAdder.bind(this, { addStudent: this.addStudent.bind(this) })),
      e(Students.bind(null, this.state, this.deleteStudent.bind(this)))
    );
  }
};

function Students(state, deleteStudent) {
  const students = state.students;
  const title = e("h1", { className: "header" }, "Students");
  let content;
  if (students.length < 1) {
    content = dangerousElement(
      "p",
      { className: "large-text text" },
      "No students &mdash; Add one!"
    );
  } else {
    content = e(
      "div",
      { className: "students-container" },
      e(
        "div",
        { className: "student__header large-text text" },
        e("span", { className: "student__name gold" }, "Name"),
        e("span", { className: "student__grade gold" }, "%")
      ),
      ...students.map(function(student, index) {
        return e(
          "div",
          { className: "student large-text text" },
          e("span", { className: "student__name" }, student.name),
          e("span", { className: "student__grade" }, student.grade),
          e(
            "span",
            {
              className: "student__delete",
              onClick: deleteStudent.bind(this, index)
            },
            dangerousElement(
              "div",
              { className: "student__delete__icon" },
              "&#x2715;"
            )
          )
        );
      })
    );
  }
  return e("div", null, title, content);
}

function dangerousElement(elementName, props, text) {
  return e(
    elementName,
    Object.assign({}, props, { dangerouslySetInnerHTML: { __html: text } })
  );
}
