const React = require("./react.js");

const validators = require("./validators.js");
const TextInput = require("./text_input_class.js");

const e = React.createElement;

module.exports = class StudentFormRow extends React.Component {
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
          className: "student__delete"
        },
        dangerousElement(
          "div",
          {
            className: "student__delete__icon",
            onClick: this.deleteStudent.bind(this, this.props.index)
          },
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
};

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

function dangerousElement(elementName, props, text) {
  return e(
    elementName,
    Object.assign({}, props, { dangerouslySetInnerHTML: { __html: text } })
  );
}
