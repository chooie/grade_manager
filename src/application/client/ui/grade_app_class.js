const React = require("./react.js");

const StudentAdder = require("./student_adder_class.js");
const StudentStatistics = require("./student_statistics.js");
const TextInput = require("./text_input_class.js");
const validators = require("./validators.js");

const e = React.createElement;

module.exports = class GradeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: [], showStudentForm: false };
    this.toggleStudentForm = this.toggleStudentForm.bind(this);
  }

  addStudent(student) {
    this.setState({ students: [...this.state.students, student] });
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
    this.setState(Object.assign({}, this.state, { students: newStudents }));
  }

  deleteStudent(indexToDelete) {
    const newStudents = this.state.students.filter(function(student, index) {
      return index !== indexToDelete;
    });
    this.setState({ students: newStudents });
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
      e(
        Students.bind(
          null,
          this.state.students,
          this.updateStudent.bind(this),
          this.deleteStudent.bind(this)
        )
      ),
      e(StudentStatistics.bind(null, this.state.students))
    );
  }
};

function Students(students, updateStudent, deleteStudent) {
  const title = e("h1", { className: "header" }, "Students");
  let content = studentInfo(students, updateStudent, deleteStudent);
  return e("div", null, title, content);
}

class StudentTabularForm extends React.Component {
  constructor(props) {
    super(props);
    const student = props.student;
    this.state = {
      values: {
        name: { value: student.name, correct: true, dirty: false },
        grade: { value: student.grade, correct: true, dirty: false }
      }
    };
    this.deleteStudent = props.deleteStudent;
    this.updateStudent = props.updateStudent;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.triggerSubmit();
  }

  triggerSubmit() {
    if (canSubmit(this.state.values)) {
      const name = this.state.values.name.value;
      const grade = this.state.values.grade.value;
      this.updateStudent(this.props.index, { name, grade });
    }
  }

  render() {
    const studentGrade = parseFloat(this.props.student.grade);
    let failClass = "";
    if (studentGrade < 65) {
      failClass = "fail";
    }
    const updateName = value => {
      const newValues = Object.assign({}, this.state.values, {
        name: value
      });
      this.setState(Object.assign({}, this.state, { values: newValues }));
    };
    const updateGrade = value => {
      const newValues = Object.assign({}, this.state.values, {
        grade: value
      });
      this.setState(Object.assign({}, this.state, { values: newValues }));
    };

    return e(
      "form",
      {
        className: "student large-text text " + failClass,
        onSubmit: this.handleSubmit
      },
      e(TextInput, {
        className: "student__name input",
        placeholder: "Name...",
        validator: validators.name,
        callback: updateName,
        callbackOnBlur: value => {
          updateName(value);
          this.triggerSubmit();
        },
        defaultState: this.state.values.name
      }),
      e(TextInput, {
        className: "student__grade input",
        placeholder: "Grade...",
        validator: validators.grade,
        callback: updateGrade,
        callbackOnBlur: value => {
          updateGrade(value);
          this.triggerSubmit();
        },
        defaultState: this.state.values.grade
      }),
      e(
        "div",
        {
          className: "student__delete",
          onClick: this.deleteStudent.bind(this, this.props.index)
        },
        dangerousElement(
          "div",
          { className: "student__delete__icon" },
          "&#x2715;"
        )
      ),
      e("input", {
        className: "hidden",
        type: "submit",
        value: "Submit"
      })
    );
  }
}

function studentInfo(students, updateStudent, deleteStudent) {
  if (students.length < 1) {
    return dangerousElement(
      "p",
      { className: "large-text text" },
      "No students &mdash; Add one!"
    );
  }
  return e(
    "div",
    { className: "students-container" },
    e(
      "div",
      { className: "student__header large-text text" },
      e("div", { className: "student__name gold" }, "Name"),
      e("div", { className: "student__grade gold" }, "%")
    ),
    ...students.map(function(student, index) {
      return e(StudentTabularForm, {
        student,
        index,
        updateStudent,
        deleteStudent
      });
    })
  );
}

function dangerousElement(elementName, props, text) {
  return e(
    elementName,
    Object.assign({}, props, { dangerouslySetInnerHTML: { __html: text } })
  );
}

function isUndefinedOrNull(value) {
  return value === undefined || value === null;
}

function canSubmit(values) {
  const keys = Object.keys(values);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const { correct } = values[key];
    if (!correct) {
      return false;
    }
  }
  return true;
}
