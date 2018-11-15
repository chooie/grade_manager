const React = require("./react.js");

const TextInput = require("./text_input_class.js");
const validators = require("./validators.js");

const e = React.createElement;

module.exports = class StudentAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: { value: "", correct: false, dirty: false },
        grade: { value: "", correct: false, dirty: false }
      }
    };

    this.addStudent = props.addStudent;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (canSubmit(this.state.values)) {
      const name = this.state.values.name.value;
      const grade = this.state.values.grade.value;
      this.addStudent({ name, grade });
    }
  }

  render() {
    return e(
      "form",
      { className: "student-form", onSubmit: this.handleSubmit },
      e("h1", { className: "header" }, "Add a Student"),
      e(TextInput, {
        className: "student-form__text-input",
        placeholder: "Name...",
        validator: validators.name,
        callback: value => {
          const newValues = Object.assign({}, this.state.values, {
            name: value
          });
          this.setState(Object.assign({}, this.state, { values: newValues }));
        }
      }),
      e(TextInput, {
        className: "student-form__text-input",
        placeholder: "Grade...",
        validator: validators.grade,
        callback: value => {
          const newValues = Object.assign({}, this.state.values, {
            grade: value
          });
          this.setState(Object.assign({}, this.state, { values: newValues }));
        }
      }),
      e("input", {
        className: "button student-form__submit",
        type: "submit",
        disabled: !canSubmit(this.state.values),
        value: "Submit"
      })
    );
  }
};

function canSubmit(values) {
  const keys = Object.keys(values);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const { dirty, correct } = values[key];
    if (!dirty || !correct) {
      return false;
    }
  }
  return true;
}
