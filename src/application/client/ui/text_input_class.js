const React = require("./react.js");

const e = React.createElement;

module.exports = class TextInput extends React.Component {
  constructor(props) {
    super(props);
    let defaultValue = "";
    if (props.defaultValue !== undefined && props.defaultValue !== null) {
      defaultValue = props.defaultValue;
    }
    this.state = {
      value: defaultValue,
      correct: false,
      dirty: false
    };
    if (!props.validator) {
      throw new Error("You must pass a validator function");
    }
    if (!props.callback) {
      throw new Error("You must a pass a callback function");
    }
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
};

function getClassDependingOnValidity({ value, dirty, correct }) {
  if (!dirty || value.length === 0) return "";

  if (correct) {
    return "valid";
  } else {
    return "error";
  }
}
