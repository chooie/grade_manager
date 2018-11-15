const React = require("./react.js");

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
        validator: function(value) {
          return value.trim() !== "";
        },
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
        validator: function(value) {
          if (isNumeric(value)) {
            const number = parseFloat(value);

            if (isValidGrade(number)) {
              return true;
            }
          }
          return false;
        },
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

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      correct: false,
      dirty: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(state => {
      const newState = {
        value,
        dirty: true,
        correct: this.props.validator(value)
      };
      this.props.callback(newState);
      return newState;
    });
  }

  render() {
    return e("input", {
      className:
        this.props.className + " " + getClassDependingOnValidity(this.state),
      type: "text",
      placeholder: this.props.placeholder,
      value: this.state.value,
      onChange: this.handleChange
    });
  }
}

function getClassDependingOnValidity({ value, dirty, correct }) {
  if (!dirty || value.length === 0) return "";

  if (correct) {
    return "valid";
  } else {
    return "error";
  }
}

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

function isValidGrade(number) {
  return number >= 0 && number <= 100;
}

function isNumeric(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}
