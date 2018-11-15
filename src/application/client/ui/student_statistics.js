const React = require("./react.js");

const e = React.createElement;

module.exports = function StudentStatistics(students) {
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
    { className: "student-statistics-container" },
    e("h1", { className: "student-statistics__title text" }, "Statistics"),
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
};
