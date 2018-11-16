const React = require("./react.js");

const StudentFormRow = require("./student_form_row_class.js");

const e = React.createElement;

module.exports = function StudentTable(students, updateStudent, deleteStudent) {
  const title = e("h1", { className: "header" }, "Students");
  const content = studentTableContent(students, updateStudent, deleteStudent);
  return e("div", { className: "student-info" }, title, content);
};

function studentTableContent(students, updateStudent, deleteStudent) {
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
      return e(StudentFormRow, {
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
