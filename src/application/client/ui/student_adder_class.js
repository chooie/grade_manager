const React = require("./react.js");

const e = React.createElement;

module.exports = class StudentAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", correct: true };

    this.addStudent = props.addStudent;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.value;

    this.setState({ value: name, dirty: true });

    if (name.trim() !== "") {
      this.setState({ correct: true });
    } else {
      this.setState({ correct: false });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (canSubmit(this.state)) {
      this.addStudent({ name: this.state.value });
    }
  }

  render() {
    return e(
      "form",
      { className: "student-form", onSubmit: this.handleSubmit },
      e("h1", { className: "header" }, "Add a Student"),
      e("input", {
        className:
          "student-form__text-input " + getClassDependingOnValidity(this.state),
        placeholder: "Name...",
        type: "text",
        value: this.state.value,
        onChange: this.handleChange
      }),
      e("input", {
        className: "button student-form__submit",
        type: "submit",
        disabled: !canSubmit(this.state),
        value: "Submit"
      })
    );
  }
};

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

function canSubmit(state) {
  return state.dirty && state.correct;
}
