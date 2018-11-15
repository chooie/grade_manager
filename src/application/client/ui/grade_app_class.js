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
      e(
        Students.bind(null, this.state.students, this.deleteStudent.bind(this))
      ),
      e(StudentStatistics.bind(null, this.state.students))
    );
  }
};

function Students(students, deleteStudent) {
  const title = e("h1", { className: "header" }, "Students");
  let content = getStudentInfo(students, deleteStudent);
  return e("div", null, title, content);
}

function getStudentInfo(students, deleteStudent) {
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
      return e(
        "div",
        { className: "student large-text text" },
        e("div", { className: "student__name" }, student.name),
        e("div", { className: "student__grade" }, student.grade),
        e(
          "div",
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

function StudentStatistics(students) {
  const numStudents = students.length;

  if (numStudents === 0) {
    return e("div", { className: "statistics-empty" });
  }

  const studentGrades = students.reduce(function(grades, student) {
    grades.push(parseFloat(student.grade));
    return grades;
  }, []);
  const studentGradeTotal = studentGrades.reduce(function(total, grade) {
    return total + grade;
  }, 0);
  const minGrade = Math.min(...studentGrades);
  const maxGrade = Math.max(...studentGrades);
  const meanGrade = studentGradeTotal / numStudents;
  const meanGradeString = +parseFloat(meanGrade.toFixed(2));

  return e(
    "div",
    { className: "student__statistics" },
    e("h1", { className: "student__statistics__header text" }, "Statistics"),
    e(
      "div",
      { className: "student-statistics text" },
      e(
        "div",
        { className: "student-statistics__headers" },
        e(
          "div",
          { className: "student-statistics__headers__column" },
          "Minimum"
        ),
        e("div", { className: "student-statistics__headers__column" }, "Mean"),
        e(
          "div",
          { className: "student-statistics__headers__column" },
          "Maximum"
        )
      ),
      e(
        "div",
        { className: "student-statistics__row" },
        e("div", { className: "student-statistics__row__column" }, minGrade),
        e(
          "div",
          { className: "student-statistics__row__column" },
          meanGradeString
        ),
        e("div", { className: "student-statistics__row__column" }, maxGrade)
      )
    )
  );
}

function dangerousElement(elementName, props, text) {
  return e(
    elementName,
    Object.assign({}, props, { dangerouslySetInnerHTML: { __html: text } })
  );
}
