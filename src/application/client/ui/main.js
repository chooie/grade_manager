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
      e("h1", { className: "header" }, "Add a Student"),
      e(StudentAdder),
      e("h1", { className: "header" }, "Students"),
      e(Students.bind(null, this.students))
    );
  }
}

class StudentAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", correct: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.value;

    this.setState({ value: name });
    this.setState({ dirty: true });

    if (name !== "") {
      this.setState({ correct: true });
    } else {
      this.setState({ correct: false });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (canSubmit(this.state)) {
      alert(`A name was submitted: ${this.state.value}`);
    }
  }

  render() {
    return e(
      "form",
      { className: "student-form", onSubmit: this.handleSubmit },
      e("input", {
        className:
          "student-form__text-input " + getClassDependingOnValidity(this.state),
        placeholder: "Name...",
        type: "text",
        value: this.state.value,
        onChange: this.handleChange
      }),
      canSubmit(this.state)
        ? e("input", {
            className: "button student-form__submit",
            type: "submit",
            value: "Submit"
          })
        : null
    );

    function getClassDependingOnValidity(state) {
      if (state.dirty) {
        if (state.correct) {
          return "valid";
        }
        if (state.value.length > 0) {
          return "error";
        }
      }
      return "";
    }
  }
}

function canSubmit(state) {
  return state.dirty && state.correct;
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
