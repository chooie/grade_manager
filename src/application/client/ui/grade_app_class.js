const React = require("./react.js");

const StudentAdder = require("./student_adder_class.js");
const StudentStatistics = require("./student_statistics.js");
const StudentTable = require("./student_table.js");

const e = React.createElement;

module.exports = class GradeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: [], showStudentForm: false };
    this.toggleStudentForm = this.toggleStudentForm.bind(this);
  }

  componentWillMount() {
    const savedStudents = JSON.parse(localStorage.getItem("students"));
    if (savedStudents) {
      this.setState({ students: savedStudents });
    }
  }

  persistState(state) {
    const students = state.students;
    localStorage.setItem("students", JSON.stringify(students));
  }

  addStudent(student) {
    this.setState(function(state) {
      const newState = { students: [...state.students, student] };
      this.persistState(newState);
      return newState;
    });
  }

  updateStudent(indexToUpdate, values) {
    const studentToUpdate = this.state.students[indexToUpdate];
    let { name, grade } = studentToUpdate;
    if (!isUndefinedOrNull(values.name)) {
      name = values.name;
    }
    if (!isUndefinedOrNull(values.grade)) {
      grade = values.grade;
    }
    const newStudents = this.state.students.slice();
    newStudents[indexToUpdate] = { name, grade };
    this.setState(function(state) {
      const newState = Object.assign({}, state, { students: newStudents });
      this.persistState(newState);
      return newState;
    });
  }

  deleteStudent(indexToDelete) {
    const newStudents = this.state.students.filter(function(student, index) {
      return index !== indexToDelete;
    });
    this.setState(function(state) {
      const newState = Object.assign({}, state, { students: newStudents });
      this.persistState(newState);
      return newState;
    });
  }

  toggleStudentForm() {
    this.setState({ showStudentForm: !this.state.showStudentForm });
  }

  render() {
    return e(
      "div",
      null,
      e(
        "div",
        { className: "center-containing-text" },
        e(
          "button",
          { className: "button", onClick: this.toggleStudentForm },
          "Toggle Student Form"
        )
      ),
      this.state.showStudentForm &&
        e(StudentAdder.bind(this, { addStudent: this.addStudent.bind(this) })),
      e(StudentStatistics.bind(null, this.state.students)),
      e(
        StudentTable.bind(
          null,
          this.state.students,
          this.updateStudent.bind(this),
          this.deleteStudent.bind(this)
        )
      )
    );
  }
};

function isUndefinedOrNull(value) {
  return value === undefined || value === null;
}
